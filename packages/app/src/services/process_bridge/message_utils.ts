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

export type RendererMessageCallback<T extends ProcessBridgeMessage<any>> = (
  data: MessageData<T>
) => void;

export type MainMessageCallback<T extends ProcessBridgeMessage<any>> = (
  sender: WebContents,
  data: MessageData<T>
) => void;

export type RendererMessageInvoker<T extends ProcessBridgeMessage<any>> = (
  data: MessageData<T>
) => void;

export type MainMessageInvoker<T extends ProcessBridgeMessage<any>> = (
  target: WebContents,
  data: MessageData<T>
) => void;

export type RendererCallbackRegistrar<T extends ProcessBridgeMessage<any>> = (
  cb: RendererMessageCallback<T>
) => void;

export type MainCallbackRegistrar<T extends ProcessBridgeMessage<any>> = (
  cb: MainMessageCallback<T>
) => void;
