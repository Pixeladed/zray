export class WindowBridge<T> {
  private readonly receiveOnContext: Pick<Window, 'addEventListener'>;
  private readonly sendToContext: Pick<Window, 'postMessage'>;

  constructor({
    receiveOn,
    sendTo,
  }: {
    receiveOn: Pick<Window, 'addEventListener'>;
    sendTo: Pick<Window, 'postMessage'>;
  }) {
    this.receiveOnContext = receiveOn;
    this.sendToContext = sendTo;
  }

  send(msg: T) {
    this.sendToContext.postMessage(msg);
  }

  onReceive(callback: MessageCallback<T>) {
    const listener = (event: MessageEvent<T>) => callback(event.data);
    this.receiveOnContext.addEventListener('message', listener);
  }
}

export type MessageCallback<T> = (msg: T) => void;
