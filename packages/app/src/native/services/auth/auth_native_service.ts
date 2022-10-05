import { auth0Login } from 'electron-auth0-login';
import {
  AuthCheckEndpoint,
  AuthLogInEndpoint,
  AuthLogOutEndpoint,
} from '../../../interface/bridge/endpoints';
import { Broadcaster, Handler } from '../../base/bridge_handler';
import { Auth0Config } from '../../base/config';
import keytar from 'keytar';
import { AuthChangedEvent } from '../../../interface/bridge/events';

export class AuthNativeService {
  private backend: ReturnType<typeof auth0Login>;

  constructor(
    private readonly config: Auth0Config,
    private readonly broadcast: Broadcaster
  ) {
    this.backend = auth0Login({
      auth0: {
        audience: this.config.audience,
        clientId: this.config.clientId,
        domain: this.config.domain,
        scopes: 'openid profile email offline_access',
      },
      debug: true,
      login: {
        windowConfig: {
          width: 400,
          height: 600,
        },
      },
      refreshTokens: {
        keytar,
        appName: this.config.keytarName,
      },
    });
  }

  getToken = () => this.backend.getToken();

  check: Handler<AuthCheckEndpoint> = async () => {
    try {
      await this.backend.getToken();
      const authenticated = await this.backend.isLoggedIn();
      return { authenticated };
    } catch (error) {
      return { authenticated: false };
    }
  };

  login: Handler<AuthLogInEndpoint> = async () => {
    await this.backend.login();
    this.broadcast<AuthChangedEvent>('auth:changed', {});
    return {};
  };

  logout: Handler<AuthLogOutEndpoint> = async () => {
    await this.backend.logout();
    this.broadcast<AuthChangedEvent>('auth:changed', {});
    return {};
  };
}
