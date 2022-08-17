import { ProcessBridgeMessage } from './message_utils';

export class PingMessage extends ProcessBridgeMessage<{}> {
  name = 'ping';
}

export class PongMessage extends ProcessBridgeMessage<{}> {
  name = 'pong';
}

export class StartSlackOAuthMessage extends ProcessBridgeMessage<{
  oAuthUrl: string;
}> {
  name = 'slack:oauth:start';
}
