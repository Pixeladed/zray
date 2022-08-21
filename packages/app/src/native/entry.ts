import { app, ipcMain } from 'electron';
import { Messages } from '../interface/bridge';
import { App } from './app';
import { createHandlerReigstrar } from './base/bridge_handler';
import { createSlackNativeService } from './services/slack/create';
import { WindowSource } from './views/view';

const baseSource: WindowSource = app.isPackaged
  ? { type: 'bundled', path: 'index.html' }
  : { type: 'server', url: 'http://localhost:3000' };

const registerHandler = createHandlerReigstrar(ipcMain);
const { slackNativeService } = createSlackNativeService();
const instance = new App(baseSource);

registerHandler(Messages.navigation.openSettings, instance.openSettings);
registerHandler(Messages.slack.connect, slackNativeService.startOAuth);

app.on('activate', instance.handleActivate);
app.on('ready', instance.handleActivate);
app.on('browser-window-blur', instance.handleBlur);
app.on('browser-window-focus', instance.handleFocus);
