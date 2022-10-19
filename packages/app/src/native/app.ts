import { GlobalShortcut, AutoUpdater, Dialog, Event } from 'electron';
import { OpenSettingsEndpoint } from '../interface/bridge/endpoints';
import { Broadcaster, Handler } from './base/bridge_handler';
import { UpdateConfig } from './base/config';
import { SearchView } from './views/search/search_view';
import { SettingsView } from './views/settings/settings_view';
import { WindowSource } from './views/view';

export class App {
  private searchView?: SearchView;
  private settingsView?: SettingsView;

  constructor(
    private readonly source: WindowSource,
    private readonly globalShortcut: GlobalShortcut,
    private readonly enableOTAUpdate: boolean,
    private readonly autoUpdater: AutoUpdater,
    private readonly updateConfig: UpdateConfig,
    private readonly getVersion: () => string,
    private readonly dialog: Dialog
  ) {}

  createMainWindow = () => {
    const searchView = this.searchView || new SearchView(this.source);
    this.searchView = searchView;

    searchView.browserWindow.on('close', () => {
      this.searchView = undefined;
    });
    searchView.open();
    searchView.browserWindow.on('close', () => {
      this.searchView = undefined;
    });
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
    this.setupUpdater();
  };

  handleQuit = () => {
    this.globalShortcut.unregisterAll();
  };

  handleWindowAllClosed = (event: Event) => {
    // prevent the app from quiting as we have a global shortcut
    event.preventDefault();
  };

  private setupUpdater = () => {
    if (!this.enableOTAUpdate) {
      // over the air update is disabled
      return;
    }

    const { platform, url: base } = this.updateConfig;
    const version = this.getVersion();
    const url = `${base}/update/${platform}/${version}`;
    this.autoUpdater.setFeedURL({ url });
    this.autoUpdater.checkForUpdates();
    this.autoUpdater.on(
      'update-downloaded',
      (event, releaseNotes, releaseName) => {
        const dialogOpts = {
          type: 'info',
          buttons: ['Restart', 'Later'],
          title: 'Application Update',
          message: process.platform === 'win32' ? releaseNotes : releaseName,
          detail:
            'A new version has been downloaded. Restart the application to apply the updates.',
        };

        this.dialog.showMessageBox(dialogOpts).then(returnValue => {
          if (returnValue.response === 0) {
            this.autoUpdater.quitAndInstall();
          }
        });
      }
    );
  };
}
