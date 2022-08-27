import { Routes } from 'routes';
import { SlackOAuthView } from 'native/views/slack_oauth/slack_oauth_view';
import { Slack } from '@highbeam/interface';
import { SlackNativeStore } from './slack_native_service_store';
import { NativeIntegration } from 'native/services/integration/integration_native_service';
import { IntegrationProfile } from 'interface/intergration';
import { WebClient } from '@slack/web-api';
import { Assert, exists } from '@highbeam/utils';
import { Path } from 'base/path';
import { SearchResult } from 'interface/search';

export class SlackNativeService implements NativeIntegration {
  id = 'com.builtin.slack';
  name = 'Slack';
  icon = Path.resource('/integrations/slack/slack.svg');

  constructor(
    private readonly redirectOrigin: string,
    private readonly slackClient: Slack.SlackClient,
    private readonly store: SlackNativeStore
  ) {}

  connect = async () => {
    const redirectUrl = this.createRedirectUrl();
    const oAuthUrl = this.slackClient.url('oauth');
    oAuthUrl.searchParams.set('redirectUrl', redirectUrl);
    const view = new SlackOAuthView(oAuthUrl.toString());
    view.open();

    let finish: (profile: IntegrationProfile) => void;
    const promise = new Promise<IntegrationProfile>(resolve => {
      finish = resolve;
    });

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
        const profile = this.store.setProfile(res);
        finish({
          ...this.store.asProfileInfo(profile),
          integrationId: this.id,
        });
      }
    );

    view.browserWindow?.on('close', () => {});

    return promise;
  };

  search = async (query: string, options: { page: number }) => {
    const profiles = await this.listProfiles();
    const ops = await Promise.allSettled(
      profiles.map(profile => this.searchInProfile(profile.id, query, options))
    );
    const results = ops
      .flatMap(op => (op.status === 'fulfilled' ? op.value : undefined))
      .filter(exists);
    return results;
  };

  listProfiles = async () => {
    return this.store.findProfiles().map(this.store.asProfileInfo);
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
        type: 'message',
        text: Assert.exists(msg.text, 'expected message text to exist'),
        url: Assert.exists(
          msg.permalink,
          'expected message permalink to exist'
        ),
        author: {
          name: msg.username ? `@${msg.username}` : 'Unknown',
        },
        channel: `#${msg.channel?.name}`,
      });
    });

    res.files?.matches?.forEach(file => {
      results.push({
        id: Assert.exists(file.id, 'expected file id to exist'),
        integrationId: this.id,
        profileId,
        type: 'file',
        title: Assert.exists(file.name, 'exepected file name to exist'),
        url: Assert.exists(
          file.url_private,
          'expected file private url to exist'
        ),
        fileType:
          file.pretty_type ||
          file.filetype ||
          file.mimetype ||
          'Unknown file type',
      });
    });

    return results;
  };

  removeProfile = async (id: string) => {
    this.store.removeProfile(id);
  };

  private isSameOriginAndPath = (urlA: string, urlB: string) => {
    const a = new URL(urlA);
    const b = new URL(urlB);

    return a.origin === b.origin && a.pathname === b.pathname;
  };

  private createRedirectUrl = () => {
    const url = new URL(this.redirectOrigin);
    url.pathname = Routes.slackIntegrationCallback().absolute;
    url.search = '';
    url.hash = '';
    return url.toString();
  };
}
