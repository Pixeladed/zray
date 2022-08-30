import { Path } from '../../../base/path';
import { Routes } from '../../../routes';
import { NativeIntegration } from '../integration/integration_native_service';
import { Gmail } from '@highbeam/interface';
import { IntegrationProfile } from '../../../interface/intergration';
import { OAuthView } from '../../views/oauth/oauth_view';
import { GmailNativeStore, GmailProfile } from './gmail_native_store';
import { google } from 'googleapis';
import { exists } from '@highbeam/utils';
import { RefreshTokenUtil } from '../../base/refresh_token_util';

export class GmailNativeService implements NativeIntegration {
  id = 'com.highbeam.gmail';
  name = 'Gmail';
  icon = Path.resource('/integrations/google_drive/google_drive.svg');

  constructor(
    private readonly redirectOrigin: string,
    private readonly gmailClient: Gmail.GmailClient,
    private readonly store: GmailNativeStore,
    private readonly refreshUtil: RefreshTokenUtil
  ) {}

  connect = async () => {
    const redirectUrl = this.createRedirectUrl();
    const oAuthUrl = this.gmailClient.url('oauth');
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
        const res = await this.gmailClient.call('exchangeCode', { code });
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

  listProfiles = async () => {
    return this.store.findProfiles().map(this.store.asProfileInfo);
  };

  removeProfile = async (profileId: string) => {
    this.store.removeProfile(profileId);
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

  private searchInProfile = async (
    profile: GmailProfile,
    query: string,
    options: { page: number }
  ) => {
    const gmail = google.gmail('v1');

    const refreshedProfile = await this.refreshUtil.maybeRefreshAccessToken(
      profile
    );
    const accessToken = refreshedProfile.accessToken;
    return [] as any[];
  };

  private createRedirectUrl = () => {
    const url = new URL(this.redirectOrigin);
    url.pathname = Routes.gmailOAuthCallback().absolute;
    url.search = '';
    url.hash = '';
    return url.toString();
  };
}
