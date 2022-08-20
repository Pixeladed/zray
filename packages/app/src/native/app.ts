import { HandlerRegistrar } from '../base/bridge';
import { SearchView } from './views/search/search_view';
import { SettingsView } from './views/settings/settings_view';
import { WindowSource } from './views/view';

export class App {
  private searchView?: SearchView;
  private settingsView?: SettingsView;

  constructor(
    private readonly source: WindowSource,
    private readonly registerHandler: HandlerRegistrar
  ) {}

  handleActivate = () => {
    const searchView =
      this.searchView ||
      new SearchView(this.source, this.registerHandler, this.openSettings);
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

  openSettings = () => {
    if (this.settingsView) {
      this.settingsView.browserWindow.focus();
    } else {
      this.settingsView = new SettingsView(this.source, this.registerHandler);
      this.settingsView?.open();
      this.settingsView.browserWindow?.on('close', () => {
        this.settingsView = undefined;
      });
    }
  };
}
