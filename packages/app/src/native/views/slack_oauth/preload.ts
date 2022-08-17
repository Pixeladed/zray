import { contextBridge, ipcMain, ipcRenderer } from 'electron';
import { SlackBridge } from '../../../services/integration/slack/slack_bridge';
import { SLACK_BRIDGE_NAMESPACE } from '../../../services/integration/slack/slack_integration';

const slackBridge = new SlackBridge(ipcRenderer, ipcMain, contextBridge);
slackBridge.exposeRendererApi(SLACK_BRIDGE_NAMESPACE);
