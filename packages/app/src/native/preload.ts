import { Assert } from '@highbeam/utils';
import { contextBridge, ipcRenderer } from 'electron';
import { Bridge, endpointAllowlist } from '../interface/bridge/bridge';
import { BRIDGE_NAMESPACE } from '../interface/bridge/endpoints';

const bridge: Bridge = {
  request: (name, req) => {
    Assert.that(endpointAllowlist.includes(name), `${name} is not allowed`);
    const payload = JSON.parse(JSON.stringify(req));
    return ipcRenderer.invoke(name, payload);
  },
};

if (contextBridge) {
  contextBridge.exposeInMainWorld(BRIDGE_NAMESPACE, bridge);
}
