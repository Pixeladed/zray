import { Assert } from '../../base/assert';

export class BrowserMessageService<T> {
  constructor(
    private readonly context: Pick<Window, 'postMessage' | 'addEventListener'>,
    private readonly sendToOrigin: string,
    private readonly receiveFromOrigin: string
  ) {}

  send(msg: T) {
    this.context.postMessage(msg, this.sendToOrigin);
  }

  onReceive(callback: MessageCallback<T>) {
    const listener = (event: MessageEvent<T>) => {
      Assert.that(
        event.origin === this.receiveFromOrigin,
        `Expected message to originate from ${this.receiveFromOrigin}`
      );
      callback(event.data);
    };

    this.context.addEventListener('message', listener);
  }
}

export type MessageCallback<T> = (msg: T) => void;
