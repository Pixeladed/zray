import { ClientFactory } from '@highbeam/interface';
import { app, ipcMain } from 'electron';
import { config } from '../base/config';
import { App } from './app';
import { createHandlerReigstrar } from './base/bridge_handler';
import { integrationInfos } from './integrations';
import { IntegrationNativeService } from './services/integration/integration_native_service';
import { createSlackNativeService } from './services/slack/create';
import { WindowSource } from './views/view';

const baseSource: WindowSource = app.isPackaged
  ? { type: 'bundled', path: 'index.html' }
  : { type: 'server', url: 'http://localhost:8080' };

const registerHandler = createHandlerReigstrar(ipcMain);
export const clientFactory = new ClientFactory(config.apiOrigin);
const { slackNativeService } = createSlackNativeService(clientFactory);
const integrations = [slackNativeService];
const integrationService = new IntegrationNativeService(integrations);
const instance = new App(baseSource, integrationInfos);

registerHandler('settings:open', instance.openSettings);
registerHandler('integration:connect', integrationService.connect);

app.on('activate', instance.handleActivate);
app.on('ready', instance.handleActivate);
app.on('browser-window-blur', instance.handleBlur);
app.on('browser-window-focus', instance.handleFocus);
