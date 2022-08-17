import { WebContents } from 'electron';

export abstract class ProcessBridgeMessage<D> {
  static type: string;
  constructor(readonly data: D) {}
}

export type MessageConstructor<T extends ProcessBridgeMessage<any>> = {
  type: string;
  new (...args: any[]): T;
};

export type MessageData<T> = T extends ProcessBridgeMessage<infer D>
  ? D
  : never;

export type MessageCallback<T extends ProcessBridgeMessage<any>> = (
  data: MessageData<T>
) => void;

export type RendererMessageInvoker<T extends ProcessBridgeMessage<any>> = (
  data: MessageData<T>
) => void;

export type MainMessageInvoker<T extends ProcessBridgeMessage<any>> = (
  target: WebContents,
  data: MessageData<T>
) => void;

export type MessageCallbackRegistrar<T extends ProcessBridgeMessage<any>> = (
  cb: MessageCallback<T>
) => void;

export class PingMessage extends ProcessBridgeMessage<undefined> {
  name = 'ping';
}

export class PongMessage extends ProcessBridgeMessage<undefined> {
  name = 'pong';
}
