import { ClientFactory } from '@highbeam/interface';
import {
  app,
  autoUpdater,
  dialog,
  globalShortcut,
  ipcMain,
  safeStorage,
  shell,
} from 'electron';
import { nativeConfig } from './base/config';
import { App } from './app';
import { createHandlerReigstrar } from './base/bridge_handler';
import { OSCrypt } from './base/crypt';
import { createGmailNativeService } from './services/gmail/create';
import { createGoogleDriveNativeService } from './services/google_drive/create';
import { createIntegrationNativeService } from './services/integration/create';
import { NativeIntegration } from './services/integration/integration_native_service';
import { NavigationNativeService } from './services/navigation/navigation_native_service';
import { createSearchNativeService } from './services/search/create';
import { createSlackNativeService } from './services/slack/create';
import { WindowSource } from './views/view';
import { createAuthNativeService } from './services/auth/create';
import { createUsageNativeService } from './services/usage/create';

const { apiOrigin, redirectOrigin } = nativeConfig;
const BASE_SOURCE: WindowSource = app.isPackaged
  ? { type: 'bundled', path: 'build/index.html' }
  : { type: 'server', url: 'http://localhost:8080' };

const instance = new App(
  BASE_SOURCE,
  globalShortcut,
  app.isPackaged,
  autoUpdater,
  nativeConfig.update,
  () => app.getVersion(),
  dialog
);

const registerHandler = createHandlerReigstrar(ipcMain);
const clientFactory = new ClientFactory(apiOrigin);
const crypt = new OSCrypt(safeStorage);

const { authNativeService } = createAuthNativeService(
  nativeConfig.auth0,
  instance.broadcast,
  crypt,
  nativeConfig.redirectOrigin
);
const { slackNativeService } = createSlackNativeService({
  redirectOrigin,
  clientFactory,
  crypt,
});
const { googleDriveNativeService } = createGoogleDriveNativeService({
  redirectOrigin,
  clientFactory,
  crypt,
});
const { gmailNativeService } = createGmailNativeService({
  redirectOrigin,
  clientFactory,
  crypt,
});
const navigationNativeService = new NavigationNativeService(shell);
const { usageNativeService } = createUsageNativeService({
  clientFactory,
  authNativeService,
});

const integrations: readonly NativeIntegration[] = [
  slackNativeService,
  googleDriveNativeService,
  gmailNativeService,
];

const { integrationNativeService } = createIntegrationNativeService({
  integrations,
  broadcast: instance.broadcast,
  usageNativeService,
  dialog,
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
registerHandler('integration:reset', integrationNativeService.reset);

registerHandler('navigation:settings:open', instance.openSettings);
registerHandler(
  'navigation:openExternal',
  navigationNativeService.openExternal
);

registerHandler('search:global', searchNativeService.search);

registerHandler('auth:check', authNativeService.check);
registerHandler('auth:login', authNativeService.login);
registerHandler('auth:logout', authNativeService.logout);

registerHandler('usage:getCurrentPlan', usageNativeService.getCurrentPlan);

app.on('activate', instance.createMainWindow);
app.on('ready', instance.handleReady);
app.on('will-quit', instance.handleQuit);
app.on('window-all-closed', instance.handleWindowAllClosed);
