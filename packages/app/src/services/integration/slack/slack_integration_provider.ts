import { BrowserWindow, WebContents } from 'electron';
import { MainBridge } from '../../process_bridge/api';
import { StartSlackOAuthMessage } from '../../process_bridge/messages';
import { MainMessageCallback } from '../../process_bridge/message_utils';

/**
 * The slack integration provider runs in the main process to provide
 * APIs that are not available in the browser
 */
export class SlackIntegrationProvider {
  constructor(
    private readonly bridge: Pick<MainBridge, 'slackOAuthComplete'>
  ) {}

  startOAuth: MainMessageCallback<StartSlackOAuthMessage> = (
    sender: WebContents,
    { oAuthUrl, redirectUrl }
  ) => {
    let connected = false;
    const win = new BrowserWindow({
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
    });
    win.loadURL(oAuthUrl);

    win.webContents.on('will-navigate', (event, newUrl) => {
      if (!this.isSameOriginAndPath(redirectUrl, newUrl)) {
        this.bridge.slackOAuthComplete(sender, {
          success: false,
          cancelled: false,
        });
        return;
      }

      const url = new URL(newUrl);
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      console.log(`Code: ${code}, state: ${state}`);
      connected = true;
      this.bridge.slackOAuthComplete(sender, {
        success: true,
        data: {},
      });

      win.close();
    });

    win.on('close', () => {
      if (connected) {
        return;
      }

      this.bridge.slackOAuthComplete(sender, {
        success: false,
        cancelled: true,
      });
    });
  };

  private isSameOriginAndPath = (urlA: string, urlB: string) => {
    const a = new URL(urlA);
    const b = new URL(urlB);

    return a.origin === b.origin && a.pathname === b.pathname;
  };
}
