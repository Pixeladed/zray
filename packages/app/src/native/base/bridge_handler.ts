import { Assert } from '@highbeam/utils';
import { IpcMain } from 'electron';
import {
  BridgeRequest,
  BridgeResponse,
  endpointAllowlist,
} from '../../interface/bridge/bridge';
import {
  Endpoint,
  EndpointName,
  EndpointRes,
  Endpoints,
} from '../../interface/bridge/endpoints';
import { Event, EventData, EventName } from '../../interface/bridge/events';

export type Handler<E extends Endpoint<any, any, any>> = (
  req: BridgeRequest<E>
) => Promise<EndpointRes<E>>;
export type HandlerRegistrar = <E extends Endpoints>(
  name: EndpointName<E>,
  handler: Handler<E>
) => void;

export const createHandlerReigstrar = (
  ipcMain: Pick<IpcMain, 'handle' | 'removeHandler'>
): HandlerRegistrar => {
  return <E extends Endpoint<any, any, any>>(
    name: EndpointName<E>,
    handler: Handler<E>
  ) => {
    Assert.that(
      endpointAllowlist.includes(name),
      `Message ${name} is not included in the allowlist`
    );
    ipcMain.removeHandler(name);
    ipcMain.handle(name, async (event, req) => {
      console.log('handling', event, req);
      const result = await handler(req);
      const data = JSON.parse(JSON.stringify(result));
      const res: BridgeResponse<any> = { data };
      return res;
    });
  };
};

export type Broadcaster = <E extends Event<any, any>>(
  name: EventName<E>,
  data: EventData<E>
) => void;
