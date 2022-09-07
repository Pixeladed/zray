import { AuthCallbackEvent } from '../../../interface/bridge/events';
import { Routes } from '../../../routes';
import { View, WindowSource } from '../view';

export class SearchView extends View {
  constructor(baseSource: WindowSource, redirectOrigin: string) {
    super(
      {
        ...baseSource,
        hash: Routes.search().absolute,
      },
      {
        width: 800,
        height: 400,
        titleBarOverlay: true,
        titleBarStyle: 'hidden',
      }
    );

    this.browserWindow.webContents.on('will-redirect', (event, url) => {
      const newUrl = new URL(url);
      if (
        newUrl.origin === redirectOrigin &&
        newUrl.pathname === Routes.loginCallback().absolute
      ) {
        event.preventDefault();
        this.send<AuthCallbackEvent>('auth:callback', { url });
      }
    });
  }
}
