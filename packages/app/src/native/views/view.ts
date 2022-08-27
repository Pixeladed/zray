import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { Event, EventData, EventName } from '../../interface/bridge/events';

/**
 * A view is a web page run in a separate window.
 * E.g. Search Bar View, Settings View, OAuth View
 */
export abstract class View {
  browserWindow: BrowserWindow;

  constructor(
    private readonly source: WindowSource,
    private readonly options: BrowserWindowConstructorOptions = {}
  ) {
    const win = new BrowserWindow({
      ...this.options,
      webPreferences: {
        ...this.options.webPreferences,
        preload: __dirname + '/preload.js',
      },
    });
    this.browserWindow = win;
  }

  open = () => {
    switch (this.source.type) {
      case 'bundled':
        this.browserWindow.loadFile(this.source.path, {
          hash: this.source.hash,
        });
        break;
      case 'server':
        this.browserWindow.loadURL(`${this.source.url}#${this.source.hash}`);
        break;
      default:
        throw new Error(`Unknown source type ${this.source}`);
    }
    this.browserWindow.on('ready-to-show', () => this.browserWindow.show());
  };

  send = <E extends Event<any, any>>(
    name: EventName<E>,
    data: EventData<E>
  ) => {
    console.log('sending', name, data);
    this.browserWindow.webContents.send(name, data);
  };
}

export type WindowSource =
  | { type: 'bundled'; path: string; hash?: string }
  | { type: 'server'; url: string; hash?: string };
