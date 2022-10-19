import {
  AuthCheckEndpoint,
  AuthLogInEndpoint,
  AuthLogOutEndpoint,
} from '../../../interface/bridge/endpoints';
import { Broadcaster, Handler } from '../../base/bridge_handler';
import { Auth0Config } from '../../base/config';
import { AuthChangedEvent } from '../../../interface/bridge/events';
import { AuthNativeStore } from './auth_native_store';
import { Clock } from '../../../base/clock';

const SCOPES = 'openid profile email offline_access';

export class AuthNativeService {
  constructor(
    private readonly config: Auth0Config,
    private readonly broadcast: Broadcaster,
    private readonly redirectUrl: string,
    private readonly store: AuthNativeStore,
    private readonly clock: Clock
  ) {}

  getToken = async (): Promise<string> => {
    const { accessToken, expiresAt } = this.store.getAccessToken();

    if (accessToken && expiresAt && expiresAt > this.clock.now()) {
      return accessToken;
    }

    const refreshToken = this.store.getRefreshToken();

    if (!refreshToken) {
      // login
      await this.login({ data: {} });
      return this.getToken();
    }

    await this.refreshAccessToken(refreshToken);
    return this.getToken();
  };

  check: Handler<AuthCheckEndpoint> = async () => {
    try {
      const { accessToken, expiresAt } = this.store.getAccessToken();
      const authenticated =
        !!accessToken && !!expiresAt && expiresAt > this.clock.now();
      return { authenticated };
    } catch (error) {
      return { authenticated: false };
    }
  };

  login: Handler<AuthLogInEndpoint> = async () => {
    // TODO: implement login
    this.broadcast<AuthChangedEvent>('auth:changed', {});
    return {};
  };

  logout: Handler<AuthLogOutEndpoint> = async () => {
    // TODO: implement logout
    this.broadcast<AuthChangedEvent>('auth:changed', {});
    return {};
  };

  private refreshAccessToken = async (refreshToken: string) => {
    // TODO: implement refresh token
  };

  private getAuthenticationURL = () => {
    return (
      'https://' +
      this.config.domain +
      '/authorize?' +
      'scope=' +
      SCOPES +
      '&' +
      'response_type=code&' +
      'client_id=' +
      this.config.clientId +
      '&' +
      'redirect_uri=' +
      this.redirectUrl
    );
  };
}
