import { IpcMain, IpcMainInvokeEvent } from 'electron';

export type Handler = (event: IpcMainInvokeEvent, ...args: any[]) => void;
export type HandlerRegistrar = (channel: string, handler: Handler) => void;

export const createHandlerReigstrar =
  (ipcMain: Pick<IpcMain, 'handle' | 'removeHandler'>): HandlerRegistrar =>
  (channel: string, handler: Handler) => {
    ipcMain.removeHandler(channel);
    ipcMain.handle(channel, handler);
  };
