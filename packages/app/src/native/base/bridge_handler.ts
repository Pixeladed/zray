import { IpcMain, IpcMainInvokeEvent, WebContents } from 'electron';
import { BridgeMessage, events, MessageParam } from '../../interface/bridge';

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

export const sendThroughBridge = <T extends typeof events[number]>(
  target: WebContents,
  message: T,
  param: MessageParam[T]
) => {
  target.send(message, param);
};
