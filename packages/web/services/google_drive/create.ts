import { Config } from '../../base/config';
import { GoogleService } from '../google/google_service';

export const createGoogleDriveService = (config: Config['google']) => {
  const scopes = ['https://www.googleapis.com/auth/drive.readonly'];
  const googleDriveService = new GoogleService(
    config.clientId,
    config.clientSecret,
    config.redirectUrl,
    scopes
  );

  return { googleDriveService };
};
