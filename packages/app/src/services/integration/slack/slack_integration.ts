import { Path } from '../../../base/path';
import { OperationResult, Provider } from '../provider';
import { Integration } from '../integration';
import { NavigationService } from '../../navigation/navigation_service';
import { Routes } from '../../../routes';
import { WindowBridge } from '../../window_bridge/window_bridge';
import { ManualPromise } from '../../../base/manual_promise';

const ICON_PATH = Path.resource('/integrations/slack/slack.svg');

export class SlackIntegration extends Integration {
  constructor(
    private readonly navigationService: NavigationService,
    private readonly clientId: string,
    private readonly context: Window
  ) {
    super('Slack', ICON_PATH);
  }

  connect = async (): Promise<OperationResult<Provider>> => {
    const url = this.createOAuthUrl();
    const proxy = this.navigationService.openNewPage(url);
    const bridge = new WindowBridge({
      receiveOn: this.context,
      sendTo: proxy,
    });
    const operation = new ManualPromise<OperationResult<Provider>>();

    let connected = false;

    proxy.addEventListener('close', () => {
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

  private createOAuthUrl = () => {
    const url = new URL('https://slack.com/oauth/v2/authorize');
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('scope', 'search:read');
    url.searchParams.set('redirect_uri', this.createRedirectUrl());
    return url.toString();
  };

  private createRedirectUrl = () => {
    const url = new URL(this.navigationService.currentHref());
    url.pathname = Routes.slackIntegrationCallback();
    url.search = '';
    url.hash = '';
    return url.toString();
  };
}

export type SlackIntegrationMessage = {};
