import { Auth0Config } from '../../base/config';

export class AuthService {
  private accessToken?: string = undefined;

  constructor(private readonly config: Auth0Config) {}

  getAccessToken = () => {
    return this.accessToken;
  };

  getAuthUrl = () => {
    return (
      'https://' +
      this.config.domain +
      '/authorize?' +
      'scope=openid profile offline_access&' +
      'response_type=code&' +
      'client_id=' +
      this.config.clientId
    );
  };
}
