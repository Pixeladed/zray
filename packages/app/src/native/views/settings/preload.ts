import { contextBridge, ipcRenderer } from 'electron';

export const SETTINGS_BRIDGE_NAME = 'SETTINGS_CONTEXT_BRIDGE';

export const Messages = {
  connectSlack: 'settings:slack:connect',
};

const settingsBridge: SettingsBridge = {
  connectSlack: () => ipcRenderer.invoke(Messages.connectSlack),
};

contextBridge.exposeInMainWorld(SETTINGS_BRIDGE_NAME, settingsBridge);

export type SettingsBridge = {
  connectSlack: () => void;
};
