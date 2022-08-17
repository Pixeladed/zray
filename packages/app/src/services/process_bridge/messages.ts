import { ProcessBridgeMessage } from './message_utils';

export class PingMessage extends ProcessBridgeMessage<{}> {
  name = 'ping';
}

export class PongMessage extends ProcessBridgeMessage<{}> {
  name = 'pong';
}

export class StartSlackOAuthMessage extends ProcessBridgeMessage<{
  oAuthUrl: string;
  redirectUrl: string;
}> {
  name = 'slack:oauth:start';
}

export class SlackOAuthCompleteMessage extends ProcessBridgeMessage<
  { success: false; cancelled: boolean } | { success: true; data: {} }
> {
  name = 'slack:oauth:success';
}
