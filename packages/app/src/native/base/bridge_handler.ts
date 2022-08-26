import { Assert } from '@highbeam/utils';
import { BrowserWindow, IpcMain } from 'electron';
import { endpointAllowlist } from '../../interface/bridge/bridge';
import {
  Endpoint,
  EndpointName,
  EndpointReq,
  EndpointRes,
  Endpoints,
} from '../../interface/bridge/endpoints';
import { Event, EventData, EventName } from '../../interface/bridge/events';

export type Handler<E extends Endpoint<any, any, any>> = (
  req: EndpointReq<E>
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
      const result = await handler(req);
      const response = JSON.parse(JSON.stringify(result));
      return response;
    });
  };
};
