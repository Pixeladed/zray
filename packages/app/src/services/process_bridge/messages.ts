import { ProcessBridgeMessage } from './message_utils';

export class PingMessage extends ProcessBridgeMessage<undefined> {
  name = 'ping';
}

export class PongMessage extends ProcessBridgeMessage<undefined> {
  name = 'pong';
}
