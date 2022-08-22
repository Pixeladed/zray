import { IpcMain, IpcMainInvokeEvent } from 'electron';
import { BridgeMessage, MessageParam } from '../../interface/bridge';

export type Handler<T> = (event: IpcMainInvokeEvent, arg: T) => void;
export type HandlerRegistrar = <T extends BridgeMessage>(
  channel: T,
  handler: Handler<MessageParam[T]>
) => void;

export const createHandlerReigstrar =
  (ipcMain: Pick<IpcMain, 'handle' | 'removeHandler'>): HandlerRegistrar =>
  <T extends BridgeMessage>(channel: T, handler: Handler<MessageParam[T]>) => {
    ipcMain.removeHandler(channel);
    ipcMain.handle(channel, handler);
  };
