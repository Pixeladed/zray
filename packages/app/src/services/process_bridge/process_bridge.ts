import { IpcMain, IpcRenderer, WebContents } from 'electron';
import { RendererApi, MainApi } from './api';
import { PingMessage, PongMessage } from './messages';
import {
  MessageCallback,
  MessageConstructor,
  MessageData,
  ProcessBridgeMessage,
} from './message_utils';

export class ProcessBridge {
  constructor(
    private readonly ipcMain: IpcMain,
    private readonly ipcRenderer: IpcRenderer
  ) {}

  getRendererApi = (): RendererApi => {
    return {
      onPong: this.rendererCallbackRegistrar(PongMessage),
      ping: this.rendererMessageInvoker(PingMessage),
    };
  };

  getMainApi = (): MainApi => {
    return {
      onPing: this.mainCallbackRegistrar(PingMessage),
      pong: this.mainMessageInvoker(PongMessage),
    };
  };

  private rendererCallbackRegistrar =
    <T extends ProcessBridgeMessage<any>>(msgCtor: MessageConstructor<T>) =>
    (cb: MessageCallback<T>) => {
      this.ipcRenderer.on(msgCtor.name, (event, data) => {
        cb(data);
      });
    };

  private rendererMessageInvoker =
    <T extends ProcessBridgeMessage<any>>(msgCtor: MessageConstructor<T>) =>
    (data: MessageData<T>) => {
      this.ipcRenderer.invoke(msgCtor.name, data);
    };

  private mainCallbackRegistrar =
    <T extends ProcessBridgeMessage<any>>(msgCtor: MessageConstructor<T>) =>
    (cb: MessageCallback<T>) => {
      this.ipcMain.handle(msgCtor.type, (event, data) => {
        cb(data);
      });
    };

  private mainMessageInvoker =
    <T extends ProcessBridgeMessage<any>>(msgCtor: MessageConstructor<T>) =>
    (target: WebContents, data: MessageData<T>) => {
      target.send(msgCtor.type, data);
    };
}
