import { Path } from '../../../base/path';
import { NativeIntegration } from '../integration/integration_native_service';

export class GoogleDriveNativeService implements NativeIntegration {
  id = 'com.highbeam.gdrive';
  name = 'Google Drive';
  icon = Path.resource('/integrations/slack/slack.svg');

  connect = async () => {
    throw new Error('not implemented');
  };

  listProfiles = async () => {
    throw new Error('not implemented');
  };

  removeProfile = async () => {
    throw new Error('not implemented');
  };

  search = async () => {
    throw new Error('not implemented');
  };
}
