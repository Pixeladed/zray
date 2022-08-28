import { ClientFactory } from '@highbeam/interface';
import { app, ipcMain, shell } from 'electron';
import { config } from '../base/config';
import { App } from './app';
import { createHandlerReigstrar } from './base/bridge_handler';
import { createGoogleDriveNativeService } from './services/google_drive/create';
import { createIntegrationNativeService } from './services/integration/create';
import { NativeIntegration } from './services/integration/integration_native_service';
import { NavigationNativeService } from './services/navigation/navigation_native_service';
import { createSearchNativeService } from './services/search/create';
import { createSlackNativeService } from './services/slack/create';
import { WindowSource } from './views/view';

const baseSource: WindowSource = app.isPackaged
  ? { type: 'bundled', path: 'build/index.html' }
  : { type: 'server', url: 'http://localhost:8080' };

const instance = new App(baseSource);

const registerHandler = createHandlerReigstrar(ipcMain);
export const clientFactory = new ClientFactory(config.apiOrigin);
const { slackNativeService } = createSlackNativeService(clientFactory);
const { googleDriveNativeService } = createGoogleDriveNativeService();
const navigationNativeService = new NavigationNativeService(shell);

const integrations: readonly NativeIntegration[] = [
  slackNativeService,
  googleDriveNativeService,
];

const { integrationNativeService } = createIntegrationNativeService({
  integrations,
  broadcast: instance.broadcast,
});
const { searchNativeService } = createSearchNativeService({
  providers: integrations,
});

registerHandler('integration:connect', integrationNativeService.connect);
registerHandler('integration:list', integrationNativeService.list);
registerHandler(
  'integration:profiles:list',
  integrationNativeService.listProfiles
);
registerHandler('integration:profiles:remove', integrationNativeService.remove);

registerHandler('navigation:settings:open', instance.openSettings);
registerHandler(
  'navigation:openExternal',
  navigationNativeService.openExternal
);

registerHandler('search:global', searchNativeService.search);

app.on('activate', instance.handleActivate);
app.on('ready', instance.handleActivate);
app.on('browser-window-blur', instance.handleBlur);
app.on('browser-window-focus', instance.handleFocus);
