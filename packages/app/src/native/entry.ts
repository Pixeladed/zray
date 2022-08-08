import { app } from 'electron';
import {
  WindowController,
  WindowSource,
} from './window_controller/window_controller';

const source: WindowSource = app.isPackaged
  ? { type: 'bundled', path: 'index.html' }
  : { type: 'server', url: 'http://localhost:3000' };
const windowController = new WindowController(source);

app.on('activate', windowController.handleActivate);
app.on('browser-window-blur', windowController.handleBlur);
app.on('ready', windowController.handleReady);
