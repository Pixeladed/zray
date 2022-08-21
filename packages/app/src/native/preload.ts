import { contextBridge, ipcRenderer } from 'electron';
import { Bridge, BRIDGE_NAMESPACE, Messages } from '../interface/bridge';

const bridge: Bridge = {
  openSettings: () => ipcRenderer.invoke(Messages.navigation.openSettings),
  connectSlack: () => ipcRenderer.invoke(Messages.slack.connect),
};

if (contextBridge) {
  contextBridge.exposeInMainWorld(BRIDGE_NAMESPACE, bridge);
}
