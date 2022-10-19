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
import { BrowserWindow } from 'electron';

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
    const win = new BrowserWindow({
      width: 400,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    win.loadURL(this.getAuthenticationURL());

    const {
      session: { webRequest },
    } = win.webContents;

    const filter = {
      urls: [`${this.redirectUrl}*`],
    };

    webRequest.onBeforeRequest(filter, async ({ url }) => {
      await this.handleLoginCallback(url);
      this.broadcast<AuthChangedEvent>('auth:changed', {});
      win.close();
    });

    return {};
  };

  logout: Handler<AuthLogOutEndpoint> = async () => {
    const logoutWindow = new BrowserWindow({ show: false });

    logoutWindow.loadURL(this.getLogOutUrl());

    logoutWindow.on('ready-to-show', async () => {
      this.store.clear();
      logoutWindow.close();
      this.broadcast<AuthChangedEvent>('auth:changed', {});
    });
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
      this.store.setAccessToken(data.access_token, expiresAt);
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

  private getLogOutUrl = () => {
    return `https://${this.config.domain}/v2/logout`;
  };

  private handleLoginCallback = async (callbackURL: string) => {
    const urlParts = new URL(callbackURL);
    const query = urlParts.searchParams;

    const exchangeOptions = {
      grant_type: 'authorization_code',
      client_id: this.config.clientId,
      code: query.get('code'),
      redirect_uri: this.redirectUrl,
    };

    try {
      const url = `https://${this.config.domain}/oauth/token`;
      const now = this.clock.now();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(exchangeOptions),
      });

      const data: ExchangeCodeResponse = await response.json();
      const expiresAt = now + data.expires_in;
      this.store.setAccessToken(data.access_token, expiresAt);
      this.store.setRefreshToken(data.refresh_token);
    } catch (error) {
      this.store.clear();
      throw error;
    }
  };
}

type RefreshAccessTokenResponse = {
  access_token: string;
  expires_in: number;
};

type ExchangeCodeResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};
