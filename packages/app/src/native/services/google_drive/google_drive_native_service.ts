import { Path } from '../../../base/path';
import { Routes } from '../../../routes';
import { NativeIntegration } from '../integration/integration_native_service';
import { GoogleDrive } from '@highbeam/interface';
import { IntegrationProfile } from '../../../interface/intergration';
import { OAuthView } from '../../views/oauth/oauth_view';
import { GoogleDriveNativeStore } from './google_drive_native_store';

export class GoogleDriveNativeService implements NativeIntegration {
  id = 'com.highbeam.gdrive';
  name = 'Google Drive';
  icon = Path.resource('/integrations/google_drive/google_drive.svg');

  constructor(
    private readonly redirectOrigin: string,
    private readonly googleDriveClient: GoogleDrive.GoogleDriveClient,
    private readonly store: GoogleDriveNativeStore
  ) {}

  connect = async () => {
    const redirectUrl = this.createRedirectUrl();
    const oAuthUrl = this.googleDriveClient.url('oauth');
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
        const res = await this.googleDriveClient.call('exchangeCode', { code });
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
    return [];
  };

  removeProfile = async () => {
    throw new Error('not implemented');
  };

  search = async () => {
    throw new Error('not implemented');
  };

  private createRedirectUrl = () => {
    const url = new URL(this.redirectOrigin);
    url.pathname = Routes.googleDriveOAuthCallback().absolute;
    url.search = '';
    url.hash = '';
    return url.toString();
  };
}
