import { Routes } from '../../../routes';
import { OAuthView } from '../../views/oauth/oauth_view';
import { Slack } from '@highbeam/interface';
import { SlackNativeStore, SlackProfile } from './slack_native_store';
import { NativeIntegration } from '../integration/integration_native_service';
import { IntegrationProfile } from '../../../interface/intergration';
import { WebClient } from '@slack/web-api';
import { Assert, exists } from '@highbeam/utils';
import { SearchResult } from '../../../interface/search';
import {
  FilesMatch,
  MessagesMatch,
} from '@slack/web-api/dist/response/SearchAllResponse';
import { Resources } from '../../../base/path';

export class SlackNativeService implements NativeIntegration {
  id = 'com.highbeam.slack';
  name = 'Slack';
  icon = Resources.SLACK_ICON;

  constructor(
    private readonly redirectOrigin: string,
    private readonly slackClient: Slack.SlackClient,
    private readonly store: SlackNativeStore
  ) {}

  connect = async () => {
    const redirectUrl = this.createRedirectUrl();
    const oAuthUrl = this.slackClient.url('oauth');
    oAuthUrl.searchParams.set('redirectUrl', redirectUrl);

    let finish: (profile: IntegrationProfile) => void;
    const promise = new Promise<IntegrationProfile>(resolve => {
      finish = resolve;
    });

    const view = new OAuthView({
      url: oAuthUrl.toString(),
      redirectUrl,
      name: this.name,
      onSuccess: async code => {
        const res = await this.slackClient.call('exchangeCode', { code });
        const profile = this.store.setProfile(res);
        finish({
          ...this.store.asProfileInfo(profile),
          integrationId: this.id,
        });
      },
    });
    view.open();

    return promise;
  };

  search = async (query: string, options: { page: number }) => {
    const profiles = this.store.findProfiles();
    const ops = await Promise.allSettled(
      profiles.map(profile => this.searchInProfile(profile, query, options))
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
    profile: SlackProfile,
    query: string,
    options: { page: number }
  ): Promise<SearchResult[]> => {
    const { accessToken } = profile;
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

    const messages = res.messages?.matches || [];
    const files = res.files?.matches || [];
    const results: SearchResult[] = [
      ...messages.map(msg => this.mapMessage(msg, profile.id)),
      ...files.map(file => this.mapFile(file, profile.id)),
    ];

    return results;
  };

  removeProfile = async (id: string) => {
    this.store.removeProfile(id);
  };

  private mapMessage = (
    msg: MessagesMatch,
    profileId: string
  ): SearchResult => {
    return {
      id: Assert.exists(msg.iid, 'expected message iid to exist'),
      integrationId: this.id,
      profileId,
      title: Assert.exists(msg.text, 'expected message text to exist'),
      url: Assert.exists(msg.permalink, 'expected message permalink to exist'),
      preview: `From @${msg.username} in #${msg.channel?.name}`,
    };
  };

  private mapFile = (file: FilesMatch, profileId: string): SearchResult => {
    return {
      id: Assert.exists(file.id, 'expected file id to exist'),
      integrationId: this.id,
      profileId,
      icon: Resources.FILE_ICON,
      title: Assert.exists(file.name, 'exepected file name to exist'),
      url: Assert.exists(
        file.url_private,
        'expected file private url to exist'
      ),
      preview:
        file.pretty_type ||
        file.filetype ||
        file.mimetype ||
        'Unknown file type',
    };
  };

  private createRedirectUrl = () => {
    const url = new URL(this.redirectOrigin);
    url.pathname = Routes.slackOAuthCallback().absolute;
    url.search = '';
    url.hash = '';
    return url.toString();
  };
}
