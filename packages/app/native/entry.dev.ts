import { BrowserWindow, app } from 'electron';

const BASE_WINDOW_URL = 'http://localhost:3000';

const createWindow = () => {
  const win = new BrowserWindow({ frame: false });
  win.loadURL(BASE_WINDOW_URL);
  return win;
};

let win: BrowserWindow | undefined;
app.on('activate', () => {
  if (win) {
    win.show();
  } else {
    win = createWindow();
  }
});
app.on('browser-window-blur', () => {
  win?.hide();
});
app.on('ready', () => {
  createWindow();
});
