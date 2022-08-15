import { BrowserWindow } from 'electron';
import { Routes } from '../../routes';

export class WindowController {
  searchWindow?: BrowserWindow;

  constructor(private readonly source: WindowSource) {}

  createSearchWindow = () => {
    const win = new BrowserWindow({
      frame: false,
      show: false,
      width: 800,
      height: 200,
    });
    win.once('ready-to-show', () => win.show());

    const path = Routes.search();
    switch (this.source.type) {
      case 'bundled':
        win.loadFile(Routes.href(this.source.path, path));
        break;
      case 'server':
        win.loadURL(Routes.href(this.source.url, path));
        break;
      default:
        throw new Error(`Unknown source type ${this.source}`);
    }

    this.searchWindow = win;
    return this.searchWindow;
  };

  handleActivate = () => {
    if (this.searchWindow) {
      this.searchWindow.show();
    } else {
      this.createSearchWindow();
    }
  };

  handleBlur = () => {
    this.searchWindow?.hide();
  };

  handleReady = () => {
    // TODO: maybe open an onboarding window etc
    this.createSearchWindow();
  };
}

export type WindowSource =
  | { type: 'bundled'; path: string }
  | { type: 'server'; url: string };
