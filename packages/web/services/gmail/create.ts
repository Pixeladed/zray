import { GoogleOAuthConfig } from '../../base/config';
import { GoogleService } from '../google/google_service';

export const createGmailService = (config: GoogleOAuthConfig) => {
  const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];
  const gmailService = new GoogleService(config, scopes);

  return { gmailService };
};
