import { Routes } from '../../../routes';
import { SlackOAuthView } from '../../views/slack_oauth/slack_oauth_view';
import { Network } from '../../../base/network';

export class SlackNativeService {
  constructor(
    private readonly redirectOrigin: string,
    private readonly network: Network
  ) {}

  startOAuth = async () => {
    const redirectUrl = this.createRedirectUrl();
    const oAuthUrl = this.network.url('slack/oauth');
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

        const res = await this.network.post<{
          accessToken: string;
        }>('slack/exchangeCode', { code });
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
