import { Config } from '../../base/config';
import { GoogleDriveService } from './google_drive_service';

export const createGoogleDriveService = (config: Config['google']) => {
  const googleDriveService = new GoogleDriveService(config);

  return { googleDriveService };
};
