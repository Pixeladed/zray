import { Routes } from '../../../routes';
import { SlackOAuthView } from '../../views/slack_oauth/slack_oauth_view';
import { Slack } from '@highbeam/interface';

export class SlackNativeService {
  constructor(
    private readonly redirectOrigin: string,
    private readonly slackClient: Slack.SlackClient
  ) {}

  startOAuth = async () => {
    const redirectUrl = this.createRedirectUrl();
    const oAuthUrl = this.slackClient.url('oauth');
    oAuthUrl.searchParams.set('redirectUrl', redirectUrl);
    const view = new SlackOAuthView(oAuthUrl.toString());
    view.open();

    view.browserWindow?.webContents.on(
      'will-redirect',
      async (event, newUrl) => {
        if (!this.isSameOriginAndPath(redirectUrl, newUrl)) {
          return;
        }

        event.preventDefault();
        view.browserWindow?.close();

        const url = new URL(newUrl);
        const code = url.searchParams.get('code');

        const res = await this.slackClient.call('exchangeCode', { code });
        console.log('accessToken', res);
      }
    );

    view.browserWindow?.on('close', () => {});
  };

  private isSameOriginAndPath = (urlA: string, urlB: string) => {
    const a = new URL(urlA);
    const b = new URL(urlB);

    return a.origin === b.origin && a.pathname === b.pathname;
  };

  private createRedirectUrl = () => {
    const url = new URL(this.redirectOrigin);
    url.pathname = Routes.slackIntegrationCallback();
    url.search = '';
    url.hash = '';
    return url.toString();
  };
}
