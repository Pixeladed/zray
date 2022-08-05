import { BrowserWindow, app } from 'electron';

const BASE_WINDOW_PATH = 'index.html';

const createWindow = () => {
  const win = new BrowserWindow({ frame: false });
  win.loadFile(BASE_WINDOW_PATH);
  return win;
};

let win: BrowserWindow | undefined;
app.on('activate', () => {
  win = createWindow();
});
app.on('browser-window-blur', () => {
  win?.close();
});
