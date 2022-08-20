import { IpcMain, IpcMainInvokeEvent } from 'electron';
import { Assert } from './assert';

export const getBridge = <T>(context: Window, namespace: string): T => {
  const key = namespace as keyof Window;
  Assert.that(!!context[key], `Bridge ${namespace} does not exist in context`);
  return context[key] as T;
};

export type Handler = (event: IpcMainInvokeEvent, ...args: any[]) => void;
export type HandlerRegistrar = (channel: string, handler: Handler) => void;

export const createHandlerReigstrar =
  (ipcMain: Pick<IpcMain, 'handle' | 'removeHandler'>): HandlerRegistrar =>
  (channel: string, handler: Handler) => {
    ipcMain.removeHandler(channel);
    ipcMain.handle(channel, handler);
  };
