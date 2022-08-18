import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('bridge', {
  openSettings: () => ipcRenderer.emit('search:openSettings'),
});
