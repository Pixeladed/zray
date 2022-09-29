import { auth0Login } from 'electron-auth0-login';
import { Auth0Config } from '../../base/config';

export class AuthNativeService {
  private backend: ReturnType<typeof auth0Login>;

  constructor(private readonly config: Auth0Config) {
    this.backend = auth0Login({
      auth0: {
        audience: this.config.audience,
        clientId: this.config.clientId,
        domain: this.config.domain,
        scopes: 'openid profile email offline_access',
      },
    });
  }

  getToken = () => this.backend.getToken();

  isLoggedIn = () => this.backend.isLoggedIn();

  login = () => this.backend.login();

  logout = () => this.backend.logout();
}
