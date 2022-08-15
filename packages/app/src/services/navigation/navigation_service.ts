import { BrowserWindow } from 'electron';
import { WindowSource } from '../../native/window_controller/window_controller';
import { Routes } from '../../routes';

export class NavigationService {
  constructor(
    private readonly isElectron: () => boolean,
    private readonly source: WindowSource,
    private readonly window: Window
  ) {}

  openNewPage = (url: string) => {
    if (this.isElectron()) {
      const win = new BrowserWindow();
      win.loadURL(url);
    } else {
      this.window.open(url);
    }
  };
}
