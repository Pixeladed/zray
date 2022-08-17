import { Path } from '../../../base/path';
import { OperationResult, Provider } from '../provider';
import { Integration } from '../integration';
import { NavigationService } from '../../navigation/navigation_service';
import { Routes } from '../../../routes';
import { ManualPromise } from '../../../base/manual_promise';
import { BrowserWindow } from 'electron';

const ICON_PATH = Path.resource('/integrations/slack/slack.svg');

export class SlackIntegration extends Integration {
  constructor(
    private readonly navigationService: NavigationService,
    private readonly clientId: string
  ) {
    super('Slack', ICON_PATH);
  }

  connect = async (): Promise<OperationResult<Provider>> => {
    let connected = false;
    const redirectUrl = this.createRedirectUrl();
    const url = this.createOAuthUrl(redirectUrl);
    const operation = new ManualPromise<OperationResult<Provider>>();
    const win = new BrowserWindow({
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
    });
    win.loadURL(url);

    win.webContents.on('will-navigate', (event, newUrl) => {
      if (!this.isSameOriginAndPath(redirectUrl, newUrl)) {
        operation.resolve({ success: false, cancelled: false });
        return;
      }

      const url = new URL(newUrl);
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      alert(`Code: ${code}, state: ${state}`);

      connected = true;
      win.close();
    });

    win.on('close', () => {
      if (!connected) {
        operation.resolve({ success: false, cancelled: true });
      }
    });

    // TODO: communicate via bridge and report on connection

    try {
      return await operation;
    } catch (error) {
      return { success: false, cancelled: false };
    }
  };

  private createOAuthUrl = (redirectUrl: string) => {
    const url = new URL('https://slack.com/oauth/v2/authorize');
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('user_scope', 'search:read');
    url.searchParams.set('redirect_uri', redirectUrl);
    return url.toString();
  };

  private createRedirectUrl = () => {
    const url = new URL(this.navigationService.currentHref());
    url.pathname = Routes.slackIntegrationCallback();
    url.search = '';
    url.hash = '';
    return url.toString();
  };

  private isSameOriginAndPath = (urlA: string, urlB: string) => {
    const a = new URL(urlA);
    const b = new URL(urlB);

    return a.origin === b.origin && a.pathname === b.pathname;
  };
}

export type SlackIntegrationMessage = {};
