import { contextBridge, ipcMain, ipcRenderer } from 'electron';
import { SEARCH_BRIDGE_NAMESPACE } from './constants';
import { SearchBridge } from './search_bridge';

const bridge = new SearchBridge(ipcRenderer, ipcMain, contextBridge);
bridge.exposeRendererApi(SEARCH_BRIDGE_NAMESPACE);
