import { ClientFactory } from '@highbeam/interface';
import { app, globalShortcut, ipcMain, safeStorage, shell } from 'electron';
import { nativeConfig } from './base/config';
import { App } from './app';
import { createHandlerReigstrar } from './base/bridge_handler';
import { KeychainSafe } from './base/safe';
import { createGmailNativeService } from './services/gmail/create';
import { createGoogleDriveNativeService } from './services/google_drive/create';
import { createIntegrationNativeService } from './services/integration/create';
import { NativeIntegration } from './services/integration/integration_native_service';
import { NavigationNativeService } from './services/navigation/navigation_native_service';
import { createSearchNativeService } from './services/search/create';
import { createSlackNativeService } from './services/slack/create';
import { WindowSource } from './views/view';

const { apiOrigin, redirectOrigin } = nativeConfig;
const BASE_SOURCE: WindowSource = app.isPackaged
  ? { type: 'bundled', path: 'build/index.html' }
  : { type: 'server', url: 'http://localhost:8080' };

const instance = new App(BASE_SOURCE, globalShortcut);

const registerHandler = createHandlerReigstrar(ipcMain);
const clientFactory = new ClientFactory(apiOrigin);
const safe = new KeychainSafe(safeStorage);
const { slackNativeService } = createSlackNativeService({
  redirectOrigin,
  clientFactory,
  safe,
});
const { googleDriveNativeService } = createGoogleDriveNativeService({
  redirectOrigin,
  clientFactory,
  safe,
});
const { gmailNativeService } = createGmailNativeService({
  redirectOrigin,
  clientFactory,
  safe,
});
const navigationNativeService = new NavigationNativeService(shell);

const integrations: readonly NativeIntegration[] = [
  slackNativeService,
  googleDriveNativeService,
  gmailNativeService,
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

app.on('activate', instance.createMainWindow);
app.on('ready', instance.handleReady);
app.on('will-quit', instance.handleQuit);
