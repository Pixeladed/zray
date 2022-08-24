import { OpenSettingsEndpoint } from '../interface/bridge/endpoints';
import { Handler } from './base/bridge_handler';
import { SearchView } from './views/search/search_view';
import { SettingsView } from './views/settings/settings_view';
import { WindowSource } from './views/view';

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
}
