import { contextBridge, ipcRenderer } from 'electron';
import SearchMessages from './messages.json';

const SEARCH_BRIDGE_NAME = 'searchBridge';

const bridge: SearchBridge = {
  openSettings: () => ipcRenderer.invoke(SearchMessages.openSettings),
};

if (contextBridge) {
  contextBridge.exposeInMainWorld(SEARCH_BRIDGE_NAME, bridge);
}

export type SearchBridge = {
  openSettings: () => void;
};
