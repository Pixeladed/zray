import { Assert } from '../../base/assert';

export class BrowserBridge<T> {
  constructor(
    private readonly context: Pick<Window, 'postMessage' | 'addEventListener'>,
    private readonly targetOrigin: string
  ) {}

  send(msg: T) {
    this.context.postMessage(msg, this.targetOrigin);
  }

  onReceive(callback: MessageCallback<T>) {
    const listener = (event: MessageEvent<T>) => {
      Assert.that(
        event.origin === this.targetOrigin,
        `Expected message to originate from ${this.targetOrigin}`
      );
      callback(event.data);
    };

    this.context.addEventListener('message', listener);
  }
}

export type MessageCallback<T> = (msg: T) => void;
