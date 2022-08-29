import { Routes } from '../../../routes';
import { OAuthView } from '../../views/oauth/oauth_view';
import { Slack } from '@highbeam/interface';
import { SlackNativeStore } from './slack_native_store';
import { NativeIntegration } from '../integration/integration_native_service';
import { IntegrationProfile } from '../../../interface/intergration';
import { WebClient } from '@slack/web-api';
import { Assert, exists } from '@highbeam/utils';
import { Path } from '../../../base/path';
import {
  FileSearchResult,
  MessageSearchResult,
  SearchResult,
} from '../../../interface/search';
import {
  FilesMatch,
  MessagesMatch,
} from '@slack/web-api/dist/response/SearchAllResponse';

export class SlackNativeService implements NativeIntegration {
  id = 'com.highbeam.slack';
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

    const messages = res.messages?.matches || [];
    const files = res.files?.matches || [];
    const results: SearchResult[] = [
      ...messages.map(msg => this.mapMessage(msg, profileId)),
      ...files.map(file => this.mapFile(file, profileId)),
    ];

    return results;
  };

  removeProfile = async (id: string) => {
    this.store.removeProfile(id);
  };

  private mapMessage = (
    msg: MessagesMatch,
    profileId: string
  ): MessageSearchResult => {
    return {
      id: Assert.exists(msg.iid, 'expected message iid to exist'),
      integrationId: this.id,
      profileId,
      type: 'message',
      icon: Path.resource('/integrations/common/message.svg'),
      text: Assert.exists(msg.text, 'expected message text to exist'),
      url: Assert.exists(msg.permalink, 'expected message permalink to exist'),
      author: {
        name: msg.username ? `@${msg.username}` : 'Unknown',
      },
      channel: `#${msg.channel?.name}`,
    };
  };

  private mapFile = (file: FilesMatch, profileId: string): FileSearchResult => {
    return {
      id: Assert.exists(file.id, 'expected file id to exist'),
      integrationId: this.id,
      profileId,
      type: 'file',
      icon: Path.resource('/integrations/common/file.svg'),
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
