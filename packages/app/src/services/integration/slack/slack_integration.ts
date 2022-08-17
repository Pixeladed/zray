import { Path } from '../../../base/path';
import { OperationResult, Provider } from '../provider';
import { Integration } from '../integration';
import { NavigationService } from '../../navigation/navigation_service';
import { Routes } from '../../../routes';
import { ManualPromise } from '../../../base/manual_promise';
import type { RendererBridge } from '../../process_bridge/api';

const ICON_PATH = Path.resource('/integrations/slack/slack.svg');

export class SlackIntegration extends Integration {
  constructor(
    private readonly navigationService: NavigationService,
    private readonly clientId: string,
    private readonly bridge: Pick<RendererBridge, 'startSlackOAuth'>
  ) {
    super('Slack', ICON_PATH);
  }

  connect = async (): Promise<OperationResult<Provider>> => {
    const redirectUrl = this.createRedirectUrl();
    const url = this.createOAuthUrl(redirectUrl);
    const operation = new ManualPromise<OperationResult<Provider>>();

    this.bridge.startSlackOAuth({ oAuthUrl: url, redirectUrl });

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
}

export type SlackIntegrationMessage = {};
