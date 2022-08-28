import { Path } from '../../../base/path';
import { NativeIntegration } from '../integration/integration_native_service';

export class GoogleDriveNativeService implements NativeIntegration {
  id = 'com.highbeam.gdrive';
  name = 'Google Drive';
  icon = Path.resource('/integrations/google_drive/google_drive.svg');

  connect = async () => {
    throw new Error('not implemented');
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
}
