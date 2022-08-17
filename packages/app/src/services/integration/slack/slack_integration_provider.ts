import { WebContents } from 'electron';
import {
  SettingsMainBridge,
  SettingsStartSlackOAuthMessage,
} from '../../../native/views/settings/api';
import { SlackOAuthView } from '../../../native/views/slack_oauth/slack_oauth_view';
import { MainMessageCallback } from '../../process_bridge/message_utils';

/**
 * The slack integration provider runs in the main process to provide
 * APIs that are not available in the browser
 */
export class SlackIntegrationProvider {
  constructor(
    private readonly bridge: Pick<SettingsMainBridge, 'slackOAuthComplete'>
  ) {}

  startOAuth: MainMessageCallback<SettingsStartSlackOAuthMessage> = (
    sender: WebContents,
    { oAuthUrl, redirectUrl }
  ) => {
    let connected = false;
    const view = new SlackOAuthView(oAuthUrl);
    view.open();

    view.browserWindow?.webContents.on('will-navigate', (event, newUrl) => {
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

      view.browserWindow?.close();
    });

    view.browserWindow?.on('close', () => {
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
