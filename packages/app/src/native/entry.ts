import { app, ipcMain } from 'electron';
import { App } from './app';
import { createHandlerReigstrar } from './base/bridge_handler';
import { integrations } from './services';
import { IntegrationNativeService } from './services/integration/integration_native_service';
import { WindowSource } from './views/view';

const baseSource: WindowSource = app.isPackaged
  ? { type: 'bundled', path: 'index.html' }
  : { type: 'server', url: 'http://localhost:8080' };

const registerHandler = createHandlerReigstrar(ipcMain);
const integrationService = new IntegrationNativeService(integrations);
const instance = new App(baseSource);

registerHandler('settings:open', instance.openSettings);
registerHandler('integration:connect', integrationService.connect);

app.on('activate', instance.handleActivate);
app.on('ready', instance.handleActivate);
app.on('browser-window-blur', instance.handleBlur);
app.on('browser-window-focus', instance.handleFocus);
