import { app, ipcMain } from 'electron';
import { createHandlerReigstrar } from '../base/bridge';
import { App } from './app';
import { WindowSource } from './views/view';

const baseSource: WindowSource = app.isPackaged
  ? { type: 'bundled', path: 'index.html' }
  : { type: 'server', url: 'http://localhost:3000' };

const registerHandler = createHandlerReigstrar(ipcMain);
const instance = new App(baseSource, registerHandler);

app.on('activate', instance.handleActivate);
app.on('browser-window-blur', instance.handleBlur);
app.on('browser-window-focus', instance.handleFocus);
