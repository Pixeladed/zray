import { ContextBridge, IpcMain, IpcRenderer, WebContents } from 'electron';
import {
  RendererMessageCallback,
  MessageConstructor,
  MessageData,
  ProcessBridgeMessage,
  MainMessageCallback,
  RendererMessageInvoker,
  MainMessageInvoker,
  RendererCallbackRegistrar,
  MainCallbackRegistrar,
} from './message_utils';

/**
 * Base bridge class allowing you to create a communication bridge
 * between the main electron process and a browser process
 */
export abstract class ProcessBridge<R extends RendererApi, M extends MainApi> {
  constructor(
    protected readonly ipcRenderer: Pick<IpcRenderer, 'invoke' | 'on'>,
    protected readonly ipcMain: Pick<IpcMain, 'handle'>,
    protected readonly contextBridge: Pick<ContextBridge, 'exposeInMainWorld'>
  ) {}

  abstract rendererBridgeConfig: () => R;
  abstract mainBridgeConfig: () => M;

  exposeRendererApi = (namespace: string) => {
    const config = this.rendererBridgeConfig();
    this.contextBridge.exposeInMainWorld(namespace, config);
  };

  protected rendererCallbackRegistrar =
    <T extends ProcessBridgeMessage<any>>(msgCtor: MessageConstructor<T>) =>
    (cb: RendererMessageCallback<T>) => {
      this.ipcRenderer.on(msgCtor.name, (event, data) => {
        cb(data);
      });
    };

  protected rendererMessageInvoker =
    <T extends ProcessBridgeMessage<any>>(msgCtor: MessageConstructor<T>) =>
    (data: MessageData<T>) => {
      this.ipcRenderer.invoke(msgCtor.name, data);
    };

  protected mainCallbackRegistrar =
    <T extends ProcessBridgeMessage<any>>(msgCtor: MessageConstructor<T>) =>
    (cb: MainMessageCallback<T>) => {
      this.ipcMain.handle(msgCtor.type, (event, data) => {
        cb(event.sender, data);
      });
    };

  protected mainMessageInvoker =
    <T extends ProcessBridgeMessage<any>>(msgCtor: MessageConstructor<T>) =>
    (target: WebContents, data: MessageData<T>) => {
      target.send(msgCtor.type, data);
    };
}

export type RendererApi = {
  [key: string]: RendererMessageInvoker<any> | RendererCallbackRegistrar<any>;
};
export type MainApi = {
  [key: string]: MainMessageInvoker<any> | MainCallbackRegistrar<any>;
};
