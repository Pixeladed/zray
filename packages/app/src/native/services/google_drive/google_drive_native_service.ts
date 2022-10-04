import { Path } from '../../../base/path';
import { Routes } from '../../../routes';
import { NativeIntegration } from '../integration/integration_native_service';
import { GoogleDrive } from '@highbeam/interface';
import { IntegrationProfile } from '../../../interface/intergration';
import { OAuthView } from '../../views/oauth/oauth_view';
import {
  GoogleDriveNativeStore,
  GoogleDriveProfile,
} from './google_drive_native_store';
import { drive_v3, google } from 'googleapis';
import { Assert, exists } from '@highbeam/utils';
import { RefreshTokenUtil } from '../../base/refresh_token_util';
import { SearchResult } from '../../../interface/search';

export class GoogleDriveNativeService implements NativeIntegration {
  id = 'com.highbeam.gdrive';
  name = 'Google Drive';
  icon = Path.resource('/integrations/google_drive/google_drive.svg');

  constructor(
    private readonly redirectOrigin: string,
    private readonly googleDriveClient: GoogleDrive.GoogleDriveClient,
    private readonly store: GoogleDriveNativeStore,
    private readonly refreshUtil: RefreshTokenUtil
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
    profile: GoogleDriveProfile,
    query: string,
    options: { page: number }
  ) => {
    const drive = google.drive('v3');

    const refreshedProfile = await this.refreshUtil.maybeRefreshAccessToken(
      profile
    );
    const accessToken = refreshedProfile.accessToken;
    const res = await drive.files.list({
      q: this.constructQuery(query),
      fields: 'files(id, name, mimeType, description, webViewLink)',
      spaces: 'drive',
      oauth_token: accessToken,
    });

    const files = res.data.files || [];
    const result = files.map(file => this.mapFile(file, profile.id));
    return result;
  };

  private constructQuery = (keyword: string) => {
    const cleaned = keyword.replace(/'/g, "\\'");
    return `fullText contains '${cleaned}' or name contains '${cleaned}'`;
  };

  private mapFile = (
    file: drive_v3.Schema$File,
    profileId: string
  ): SearchResult => {
    const id = Assert.exists(file.id, 'expected id to exist');
    const fileType = Assert.exists(
      file.mimeType,
      'expected mime type to exist'
    );
    const title = Assert.exists(file.name, 'expected name to exist');
    const url = Assert.exists(
      file.webViewLink,
      'expected web view link to exist'
    );

    return {
      id,
      integrationId: this.id,
      profileId,
      title,
      url,
      icon: Path.resource('/integrations/common/file.svg'),
      preview: fileType,
    };
  };

  private createRedirectUrl = () => {
    const url = new URL(this.redirectOrigin);
    url.pathname = Routes.googleDriveOAuthCallback().absolute;
    url.search = '';
    url.hash = '';
    return url.toString();
  };
}
