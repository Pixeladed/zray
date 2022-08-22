import { contextBridge, ipcRenderer } from 'electron';
import {
  allowlist,
  Bridge,
  BridgeMessage,
  BRIDGE_NAMESPACE,
  MessageParam,
} from '../interface/bridge';
import { IntegrationInfo } from '../web/services/integrations';
import { integrations } from './entry';

const createInvoker =
  <T extends BridgeMessage>(message: T) =>
  (param: MessageParam[T]) => {
    ipcRenderer.invoke(message, param);
  };

type InvokerMap = {
  [key in typeof allowlist[number]]: (param: MessageParam[key]) => void;
};

const invokers: InvokerMap = allowlist.reduce((map, msg) => {
  map[msg] = createInvoker(msg);
  return map;
}, {} as InvokerMap);

const integrationsInfo: IntegrationInfo[] = integrations.map(
  ({ icon, name, id }) => ({ icon, name, id })
);

const bridge: Bridge = {
  invoke: (message, param) => invokers[message](param),
  integrations: integrationsInfo,
};

if (contextBridge) {
  contextBridge.exposeInMainWorld(BRIDGE_NAMESPACE, bridge);
}
