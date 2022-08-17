import { contextBridge, ipcMain, ipcRenderer } from 'electron';
import { SlackBridge } from '../../../services/integration/slack/slack_bridge';
import { SLACK_BRIDGE_NAMESPACE } from './constants';

const bridge = new SlackBridge(ipcRenderer, ipcMain, contextBridge);
bridge.exposeRendererApi(SLACK_BRIDGE_NAMESPACE);
