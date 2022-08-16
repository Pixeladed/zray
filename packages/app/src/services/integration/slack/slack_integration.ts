import { Path } from '../../../base/path';
import { OperationResult, Provider } from '../provider';
import { Integration } from '../integration';
import { URL } from 'url';
import { NavigationService } from '../../navigation/navigation_service';
import { Routes } from '../../../routes';

const ICON_PATH = Path.resource('/integrations/slack/slack.svg');

export class SlackIntegration extends Integration {
  constructor(
    private readonly navigationService: NavigationService,
    private readonly clientId: string
  ) {
    super('Slack', ICON_PATH);
  }

  connect = async (): Promise<OperationResult<Provider>> => {
    const url = this.createOAuthUrl();
    this.navigationService.openNewPage(url);
    return { success: false, cancelled: false };
  };

  private createOAuthUrl = () => {
    const url = new URL('https://slack.com/oauth/authorize');
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('scope', 'search:read');
    url.searchParams.set('redirect_uri', this.createRedirectUrl());
    return url.toString();
  };

  private createRedirectUrl = () => {
    const url = new URL(this.navigationService.currentHref());
    url.pathname = Routes.slackIntegrationCallback();
    url.search = '';
    return url.toString();
  };
}
