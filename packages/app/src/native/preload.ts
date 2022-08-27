import { Assert } from '@highbeam/utils';
import { contextBridge, ipcRenderer } from 'electron';
import {
  Bridge,
  endpointAllowlist,
  eventAllowlist,
} from 'interface/bridge/bridge';
import { BRIDGE_NAMESPACE } from 'interface/bridge/endpoints';

const bridge: Bridge = {
  request: (name, req) => {
    Assert.that(
      endpointAllowlist.includes(name),
      `request ${name} is not allowed`
    );
    const payload = JSON.parse(JSON.stringify(req));
    return ipcRenderer.invoke(name, payload);
  },

  on: (name, callback) => {
    Assert.that(eventAllowlist.includes(name), `event ${name} is not allowed`);
    return ipcRenderer.on(name, (event, data) => {
      callback(data);
    });
  },
};

if (contextBridge) {
  contextBridge.exposeInMainWorld(BRIDGE_NAMESPACE, bridge);
}
