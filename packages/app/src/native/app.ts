import { GlobalShortcut } from 'electron';
import { OpenSettingsEndpoint } from '../interface/bridge/endpoints';
import { Broadcaster, Handler } from './base/bridge_handler';
import { SearchView } from './views/search/search_view';
import { SettingsView } from './views/settings/settings_view';
import { WindowSource } from './views/view';

export class App {
  private searchView?: SearchView;
  private settingsView?: SettingsView;

  constructor(
    private readonly source: WindowSource,
    private readonly redirectOrigin: string,
    private readonly globalShortcut: GlobalShortcut
  ) {}

  createMainWindow = () => {
    const searchView =
      this.searchView || new SearchView(this.source, this.redirectOrigin);
    this.searchView = searchView;

    searchView.browserWindow.on('close', () => {
      this.searchView = undefined;
    });
    searchView.open();
  };

  openSettings: Handler<OpenSettingsEndpoint> = async () => {
    if (this.settingsView) {
      this.settingsView.browserWindow.focus();
    } else {
      this.settingsView = new SettingsView(this.source);
      this.settingsView?.open();
      this.settingsView.browserWindow?.on('close', () => {
        this.settingsView = undefined;
      });
    }

    return {};
  };

  broadcast: Broadcaster = (name, data) => {
    this.searchView?.send(name, data);
    this.settingsView?.send(name, data);
  };

  handleReady = () => {
    this.globalShortcut.register('Shift+Space', this.createMainWindow);
    this.createMainWindow();
  };

  handleQuit = () => {
    this.globalShortcut.unregisterAll();
  };
}
