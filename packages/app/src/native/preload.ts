import { contextBridge, ipcRenderer } from 'electron';
import {
  Bridge,
  BridgeMessage,
  BRIDGE_NAMESPACE,
  MessageParam,
} from '../interface/bridge';

const invoke = <T extends BridgeMessage>(
  message: T,
  param: MessageParam[T]
) => {
  ipcRenderer.invoke(message, param);
};

const bridge: Bridge = { invoke };

if (contextBridge) {
  contextBridge.exposeInMainWorld(BRIDGE_NAMESPACE, bridge);
}
