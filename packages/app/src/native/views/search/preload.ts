import { contextBridge, ipcRenderer } from 'electron';

const SEARCH_BRIDGE_NAME = 'SEARCH_CONTEXT_BRIDGE';

export const SearchMessages = {
  openSettings: 'search:settings:open',
};

const bridge: SearchBridge = {
  openSettings: () => ipcRenderer.invoke(SearchMessages.openSettings),
};

if (contextBridge) {
  contextBridge.exposeInMainWorld(SEARCH_BRIDGE_NAME, bridge);
}

export type SearchBridge = {
  openSettings: () => void;
};
