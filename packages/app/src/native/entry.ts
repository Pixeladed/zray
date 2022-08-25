import { ClientFactory } from '@highbeam/interface';
import { app, ipcMain, shell } from 'electron';
import { config } from '../base/config';
import { App } from './app';
import { createHandlerReigstrar } from './base/bridge_handler';
import { createIntegrationNativeService } from './services/integration/create';
import { NavigationNativeService } from './services/navigation/navigation_native_service';
import { createSearchNativeService } from './services/search/create';
import { createSlackNativeService } from './services/slack/create';
import { WindowSource } from './views/view';

const baseSource: WindowSource = app.isPackaged
  ? { type: 'bundled', path: 'build/index.html' }
  : { type: 'server', url: 'http://localhost:8080' };

const registerHandler = createHandlerReigstrar(ipcMain);
export const clientFactory = new ClientFactory(config.apiOrigin);
const { slackNativeService } = createSlackNativeService(clientFactory);
const navigationNativeService = new NavigationNativeService(shell);

const integrations = [slackNativeService];

const { integrationNativeService } = createIntegrationNativeService({
  integrations,
});
const { searchNativeService } = createSearchNativeService({
  providers: integrations,
});
const instance = new App(baseSource);

registerHandler('integration:connect', integrationNativeService.connect);
registerHandler('integration:list', integrationNativeService.list);
registerHandler(
  'integration:profiles:list',
  integrationNativeService.listProfiles
);

registerHandler('navigation:settings:open', instance.openSettings);
registerHandler(
  'navigation:openExternal',
  navigationNativeService.openExterenal
);

registerHandler('search:global', searchNativeService.search);

app.on('activate', instance.handleActivate);
app.on('ready', instance.handleActivate);
app.on('browser-window-blur', instance.handleBlur);
app.on('browser-window-focus', instance.handleFocus);
