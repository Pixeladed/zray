import { OpenSettingsEndpoint } from 'interface/bridge/endpoints';
import { Broadcaster, Handler } from 'native/base/bridge_handler';
import { SearchView } from 'native/views/search/search_view';
import { SettingsView } from 'native/views/settings/settings_view';
import { WindowSource } from 'native/views/view';

export class App {
  private searchView?: SearchView;
  private settingsView?: SettingsView;

  constructor(private readonly source: WindowSource) {}

  handleActivate = () => {
    const searchView = this.searchView || new SearchView(this.source);
    this.searchView = searchView;

    searchView.browserWindow.on('close', () => {
      this.searchView = undefined;
    });
    searchView.open();
  };

  handleFocus = () => {
    this.searchView?.browserWindow.setOpacity(1);
  };

  handleBlur = () => {
    this.searchView?.browserWindow.setOpacity(0.5);
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
}
