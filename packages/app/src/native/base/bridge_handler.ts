import { Assert } from '@highbeam/utils';
import { BrowserWindow, IpcMain, IpcMainInvokeEvent } from 'electron';
import {
  allowlist,
  BridgeMessage,
  events,
  MessageParam,
} from '../../interface/bridge';

export type Handler<T> = (event: IpcMainInvokeEvent, arg: T) => void;
export type HandlerRegistrar = <T extends BridgeMessage>(
  channel: T,
  handler: Handler<MessageParam[T]>
) => void;

export const createHandlerReigstrar =
  (ipcMain: Pick<IpcMain, 'handle' | 'removeHandler'>): HandlerRegistrar =>
  <T extends BridgeMessage>(channel: T, handler: Handler<MessageParam[T]>) => {
    Assert.that(
      allowlist.includes(channel),
      `Message ${channel} is not included in the allowlist`
    );
    ipcMain.removeHandler(channel);
    ipcMain.handle(channel, handler);
  };

export const sendToRenderer = <T extends typeof events[number]>(
  browserWindow: BrowserWindow,
  message: T,
  param: MessageParam[T]
) => {
  Assert.that(
    events.includes(message),
    `Event ${message} is not included in the allowlist`
  );
  browserWindow.webContents.send(message, param);
};
