import { ClientFactory } from '@highbeam/interface';
import { app, ipcMain, shell } from 'electron';
import { config } from '../base/config';
import { App } from './app';
import { createHandlerReigstrar } from './base/bridge_handler';
import { createGmailNativeService } from './services/gmail/create';
import { createGoogleDriveNativeService } from './services/google_drive/create';
import { createIntegrationNativeService } from './services/integration/create';
import { NativeIntegration } from './services/integration/integration_native_service';
import { NavigationNativeService } from './services/navigation/navigation_native_service';
import { createSearchNativeService } from './services/search/create';
import { createSlackNativeService } from './services/slack/create';
import { WindowSource } from './views/view';

const { apiOrigin, redirectOrigin } = config;
const BASE_SOURCE: WindowSource = app.isPackaged
  ? { type: 'bundled', path: 'build/index.html' }
  : { type: 'server', url: 'http://localhost:8080' };

const instance = new App(BASE_SOURCE);

const registerHandler = createHandlerReigstrar(ipcMain);
export const clientFactory = new ClientFactory(apiOrigin);
const { slackNativeService } = createSlackNativeService({
  redirectOrigin,
  clientFactory,
});
const { googleDriveNativeService } = createGoogleDriveNativeService({
  redirectOrigin,
  clientFactory,
});
const { gmailNativeService } = createGmailNativeService({
  redirectOrigin,
  clientFactory,
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

app.on('activate', instance.handleActivate);
app.on('ready', instance.handleActivate);
