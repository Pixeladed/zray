import { contextBridge, ipcMain, ipcRenderer } from 'electron';
import { SETTINGS_BRIDGE_NAMESPACE } from './api';
import { SettingsBridge } from './settings_bridge';

const bridge = new SettingsBridge(ipcRenderer, ipcMain, contextBridge);
bridge.exposeRendererApi(SETTINGS_BRIDGE_NAMESPACE);
