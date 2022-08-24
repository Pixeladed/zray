import {
  OpenSettingsParam,
  SearchRequestParam,
} from '../interface/bridge/endpoints';
import {
  Handler,
  HandlerRegistrar,
  sendToRenderer,
} from './base/bridge_handler';
import { IntegrationNativeService } from './services/integration/integration_native_service';
import { SearchNativeService } from './services/search/search_native_service';
import { SearchView } from './views/search/search_view';
import { SettingsView } from './views/settings/settings_view';
import { WindowSource } from './views/view';

export class App {
  private searchView?: SearchView;
  private settingsView?: SettingsView;

  constructor(
    private readonly source: WindowSource,
    private readonly registerHandler: HandlerRegistrar,
    private readonly integrationNativeService: IntegrationNativeService,
    private readonly searchNativeService: SearchNativeService
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

  handleSearch: Handler<SearchRequestParam> = async (
    event,
    { id, query, page }
  ) => {
    const results = await this.searchNativeService.search(query, page);
    if (this.searchView) {
      sendToRenderer(this.searchView?.browserWindow, 'search:response', {
        id,
        results,
      });
    }
  };
}
