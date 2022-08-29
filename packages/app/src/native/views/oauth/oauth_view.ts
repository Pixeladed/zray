import { View } from '../view';

export class OAuthView extends View {
  constructor({
    url,
    name,
    redirectUrl,
    onSuccess,
  }: {
    url: string;
    name: string;
    redirectUrl: string;
    onSuccess: (code: string) => void;
  }) {
    super(
      { type: 'server', url },
      {
        width: 500,
        height: 700,
        title: `Connecting to ${name}`,
        webPreferences: {
          contextIsolation: true,
          nodeIntegration: false,
        },
      }
    );

    this.browserWindow.webContents.on(
      'will-redirect',
      async (event, newUrl) => {
        if (!this.isSameOriginAndPath(redirectUrl, newUrl)) {
          return;
        }

        event.preventDefault();
        this.browserWindow.close();

        const url = new URL(newUrl);
        const code = url.searchParams.get('code');

        if (typeof code !== 'string') {
          throw new Error('expected code to be string');
        }

        onSuccess(code);
      }
    );
  }

  private isSameOriginAndPath = (urlA: string, urlB: string) => {
    const a = new URL(urlA);
    const b = new URL(urlB);

    return a.origin === b.origin && a.pathname === b.pathname;
  };
}
