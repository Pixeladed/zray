import { contextBridge, ipcMain, ipcRenderer } from 'electron';
import { SLACK_OAUTH_BRIDGE_NAMESPACE } from './api';
import { SlackOAuthBridge } from './slack_oauth_bridge';

const bridge = new SlackOAuthBridge(ipcRenderer, ipcMain, contextBridge);
bridge.exposeRendererApi(SLACK_OAUTH_BRIDGE_NAMESPACE);
