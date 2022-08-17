import { IpcMain, IpcRenderer, WebContents } from 'electron';
import { RendererBridge, MainBridge } from './api';
import {
  PingMessage,
  PongMessage,
  SlackOAuthCompleteMessage,
  StartSlackOAuthMessage,
} from './messages';
import {
  RendererMessageCallback,
  MessageConstructor,
  MessageData,
  ProcessBridgeMessage,
  MainMessageCallback,
} from './message_utils';

declare global {
  interface Window {
    RendererBridge: RendererBridge;
  }
}

export class ProcessBridge {
  constructor(
    private readonly ipcMain: IpcMain,
    private readonly ipcRenderer: IpcRenderer
  ) {}

  rendererBridgeConfig = (): RendererBridge => {
    return {
      onPong: this.rendererCallbackRegistrar(PongMessage),
      ping: this.rendererMessageInvoker(PingMessage),

      startSlackOAuth: this.rendererMessageInvoker(StartSlackOAuthMessage),
      onSlackOAuthComplete: this.rendererCallbackRegistrar(
        SlackOAuthCompleteMessage
      ),
    };
  };

  mainBridgeConfig = (): MainBridge => {
    return {
      onPing: this.mainCallbackRegistrar(PingMessage),
      pong: this.mainMessageInvoker(PongMessage),

      onStartSlackOAuth: this.mainCallbackRegistrar(StartSlackOAuthMessage),
      slackOAuthComplete: this.mainMessageInvoker(SlackOAuthCompleteMessage),
    };
  };

  private rendererCallbackRegistrar =
    <T extends ProcessBridgeMessage<any>>(msgCtor: MessageConstructor<T>) =>
    (cb: RendererMessageCallback<T>) => {
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
    (cb: MainMessageCallback<T>) => {
      this.ipcMain.handle(msgCtor.type, (event, data) => {
        cb(event.sender, data);
      });
    };

  private mainMessageInvoker =
    <T extends ProcessBridgeMessage<any>>(msgCtor: MessageConstructor<T>) =>
    (target: WebContents, data: MessageData<T>) => {
      target.send(msgCtor.type, data);
    };
}
