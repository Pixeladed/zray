import { contextBridge, ipcRenderer } from 'electron';

const SETTINGS_BRIDGE_NAME = 'settingsBridge';

export const SettingsMessages = {
  connectSlack: 'settings:slack:connect',
};

const bridge: SettingsBridge = {
  connectSlack: () => ipcRenderer.invoke(SettingsMessages.connectSlack),
};

if (contextBridge) {
  contextBridge.exposeInMainWorld(SETTINGS_BRIDGE_NAME, bridge);
}

export type SettingsBridge = {
  connectSlack: () => void;
};
