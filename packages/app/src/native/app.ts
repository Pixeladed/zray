import { OpenSettingsParam } from '../interface/bridge';
import { Handler, HandlerRegistrar } from './base/bridge_handler';
import { IntegrationNativeService } from './services/integration/integration_native_service';
import { SearchView } from './views/search/search_view';
import { SettingsView } from './views/settings/settings_view';
import { WindowSource } from './views/view';

export class App {
  private searchView?: SearchView;
  private settingsView?: SettingsView;

  constructor(
    private readonly source: WindowSource,
    private readonly registerHandler: HandlerRegistrar,
    private readonly integrationNativeService: IntegrationNativeService
  ) {}

  handleActivate = () => {
    const searchView =
      this.searchView ||
      new SearchView(
        this.source,
        this.registerHandler,
        this.integrationNativeService
      );
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

  openSettings: Handler<OpenSettingsParam> = () => {
    if (this.settingsView) {
      this.settingsView.browserWindow.focus();
    } else {
      this.settingsView = new SettingsView(
        this.source,
        this.registerHandler,
        this.integrationNativeService.list()
      );
      this.settingsView?.open();
      this.settingsView.browserWindow?.on('close', () => {
        this.settingsView = undefined;
      });
    }
  };
}
