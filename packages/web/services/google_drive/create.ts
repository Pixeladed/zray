import { GoogleOAuthConfig } from '../../base/config';
import { GoogleService } from '../google/google_service';

export const createGoogleDriveService = (config: GoogleOAuthConfig) => {
  const scopes = ['https://www.googleapis.com/auth/drive.readonly'];
  const googleDriveService = new GoogleService(config, scopes);

  return { googleDriveService };
};
