import { Routes } from '../../../routes';
import { SlackOAuthView } from '../../views/slack_oauth/slack_oauth_view';
import { Slack } from '@highbeam/interface';
import { SlackNativeStore } from './slack_native_service_store';
import { NativeIntegration } from '../integration/integration_native_service';
import { SlackNativeIntegration } from './slack_native_integration';
import { ProfileInfo } from '../../../interface/intergration';
import { IComputedValue } from 'mobx';
import { WebClient } from '@slack/web-api';
import { Assert, exists } from '@highbeam/utils';
import { SearchProvider, SearchResult } from '../search/search_native_service';

export class SlackNativeService
  extends SlackNativeIntegration
  implements NativeIntegration, SearchProvider
{
  profiles: IComputedValue<ProfileInfo[]>;

  constructor(
    private readonly redirectOrigin: string,
    private readonly slackClient: Slack.SlackClient,
    private readonly store: SlackNativeStore
  ) {
    super();
    this.profiles = store.profiles;
  }

  connect = async () => {
    const redirectUrl = this.createRedirectUrl();
    const oAuthUrl = this.slackClient.url('oauth');
    oAuthUrl.searchParams.set('redirectUrl', redirectUrl);
    const view = new SlackOAuthView(oAuthUrl.toString());
    view.open();

    view.browserWindow?.webContents.on(
      'will-redirect',
      async (event, newUrl) => {
        if (!this.isSameOriginAndPath(redirectUrl, newUrl)) {
          return;
        }

        event.preventDefault();
        view.browserWindow?.close();

        const url = new URL(newUrl);
        const code = url.searchParams.get('code');

        const res = await this.slackClient.call('exchangeCode', { code });
        this.store.setProfile(res);
      }
    );

    view.browserWindow?.on('close', () => {});
  };

  search = async (query: string, options: { page: number }) => {
    const profiles = this.store.profiles.get();
    const ops = await Promise.allSettled(
      profiles.map(profile => this.searchInProfile(profile.id, query, options))
    );
    const results = ops
      .flatMap(op => (op.status === 'fulfilled' ? op.value : undefined))
      .filter(exists);
    return results;
  };

  private searchInProfile = async (
    profileId: string,
    query: string,
    options: { page: number }
  ): Promise<SearchResult[]> => {
    const { accessToken } = Assert.exists(
      this.store.getProfile(profileId),
      'expected profile to exist'
    );

    const client = new WebClient(accessToken);
    const res = await client.search.all({
      query,
      sort: 'score',
      sort_dir: 'desc',
      count: 100,
      page: options.page,
    });

    if (!res.ok) {
      throw new Error('Failed to search slack', {
        cause: new Error(res.error),
      });
    }

    const results: SearchResult[] = [];

    res.messages?.matches?.forEach(msg => {
      results.push({
        id: Assert.exists(msg.iid, 'expected message iid to exist'),
        integrationId: this.id,
        profileId,
        title: Assert.exists(msg.text, 'expected message text to exist'),
        url: Assert.exists(
          msg.permalink,
          'expected message permalink to exist'
        ),
        description: `#${msg.channel?.name}`,
      });
    });

    return results;
  };

  private isSameOriginAndPath = (urlA: string, urlB: string) => {
    const a = new URL(urlA);
    const b = new URL(urlB);

    return a.origin === b.origin && a.pathname === b.pathname;
  };

  private createRedirectUrl = () => {
    const url = new URL(this.redirectOrigin);
    url.pathname = Routes.slackIntegrationCallback();
    url.search = '';
    url.hash = '';
    return url.toString();
  };
}
