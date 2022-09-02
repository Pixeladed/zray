import { ClientFactory } from '@highbeam/interface';
import { RefreshTokenUtil } from '../../base/refresh_token_util';
import { Safe } from '../../base/safe';
import { GoogleDriveNativeService } from './google_drive_native_service';
import { GoogleDriveNativeStore } from './google_drive_native_store';

const STORE_NAME = 'google_drive_native_store';

export const createGoogleDriveNativeService = ({
  clientFactory,
  redirectOrigin,
  safe,
}: {
  redirectOrigin: string;
  clientFactory: ClientFactory;
  safe: Safe;
}) => {
  const store = new GoogleDriveNativeStore(STORE_NAME, safe);
  const googleDriveClient = clientFactory.for('google_drive');
  const refreshTokenUtil = new RefreshTokenUtil(refreshToken =>
    googleDriveClient.call('refreshToken', { refreshToken })
  );
  const googleDriveNativeService = new GoogleDriveNativeService(
    redirectOrigin,
    googleDriveClient,
    store,
    refreshTokenUtil
  );

  return { googleDriveNativeService };
};
