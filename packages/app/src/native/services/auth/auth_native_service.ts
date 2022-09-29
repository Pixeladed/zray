import { auth0Login } from 'electron-auth0-login';
import {
  AuthCheckEndpoint,
  AuthLogInEndpoint,
  AuthLogOutEndpoint,
} from '../../../interface/bridge/endpoints';
import { Handler } from '../../base/bridge_handler';
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

  check: Handler<AuthCheckEndpoint> = async () => {
    const authenticated = await this.backend.isLoggedIn();
    return { authenticated };
  };

  login: Handler<AuthLogInEndpoint> = async () => {
    await this.backend.login();
    return {};
  };

  logout: Handler<AuthLogOutEndpoint> = async () => {
    await this.backend.logout();
    return {};
  };
}
