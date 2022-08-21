import { contextBridge, ipcRenderer } from 'electron';
import {
  Bridge,
  BRIDGE_NAMESPACE,
  NavigationMessages,
  SlackMessages,
} from '../interface/bridge';

const bridge: Bridge = {
  openSettings: () => ipcRenderer.invoke(NavigationMessages.openSettings),
  connectSlack: () => ipcRenderer.invoke(SlackMessages.connect),
};

if (contextBridge) {
  contextBridge.exposeInMainWorld(BRIDGE_NAMESPACE, bridge);
}
