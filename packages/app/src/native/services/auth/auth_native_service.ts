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
    const url = `https://${this.config.domain}/oauth/token`;

    try {
      const now = this.clock.now();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          client_id: this.config.clientId,
          refresh_token: refreshToken,
        }),
      });

      const data: RefreshAccessTokenResponse = await response.json();
      const expiresAt = now + data.expires_in;
      this.store.setRefreshToken(data.access_token, expiresAt);
    } catch (error) {
      await this.logout({ data: {} });

      throw error;
    }
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
      'audience=' +
      this.config.audience +
      '&' +
      'redirect_uri=' +
      this.redirectUrl
    );
  };
}

type RefreshAccessTokenResponse = {
  access_token: string;
  expires_in: number;
};
