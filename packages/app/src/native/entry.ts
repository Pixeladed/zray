import { app } from 'electron';
import { SearchView } from './views/search/search_view';
import { WindowSource } from './views/view';

const baseSource: WindowSource = app.isPackaged
  ? { type: 'bundled', path: 'index.html' }
  : { type: 'server', url: 'http://localhost:3000' };

const searchView = new SearchView(baseSource);

app.on('activate', searchView.handleActivate);
app.on('browser-window-blur', searchView.handleBlur);
app.on('ready', searchView.handleReady);
