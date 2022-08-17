import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { Routes } from '../../routes';

/**
 * A view is a web page run in a separate window.
 * E.g. Search Bar View, Settings View, OAuth View
 */
export class View {
  browserWindow?: BrowserWindow;

  static extendWindowSource = (source: WindowSource, path: string) => {
    const result = { ...source };
    switch (result.type) {
      case 'bundled':
        result.path = Routes.href(result.path, path);
        break;
      case 'server':
        result.url = Routes.href(result.url, path);
        break;
      default:
        throw new Error(`Unknown source type ${source}`);
    }
    return result;
  };

  constructor(
    private readonly source: WindowSource,
    private readonly options: BrowserWindowConstructorOptions = {},
    private readonly preloadPath?: string
  ) {}

  open = () => {
    const win = new BrowserWindow({
      ...this.options,
      show: false,
      webPreferences: {
        preload: this.preloadPath,
      },
    });
    this.browserWindow = win;
    switch (this.source.type) {
      case 'bundled':
        win.loadFile(this.source.path);
        break;
      case 'server':
        win.loadURL(this.source.url);
        break;
      default:
        throw new Error(`Unknown source type ${this.source}`);
    }
    win.on('ready-to-show', () => win.show());
  };
}

export type WindowSource =
  | { type: 'bundled'; path: string }
  | { type: 'server'; url: string };
