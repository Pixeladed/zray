import type {
  PingMessage,
  PongMessage,
  SlackOAuthCompleteMessage,
  StartSlackOAuthMessage,
} from './messages';
import type {
  MainMessageInvoker,
  MainCallbackRegistrar,
  RendererCallbackRegistrar,
  RendererMessageInvoker,
} from './message_utils';

export type MainBridge = {
  // dummy
  onPing: MainCallbackRegistrar<PingMessage>;
  pong: MainMessageInvoker<PongMessage>;

  onStartSlackOAuth: MainCallbackRegistrar<StartSlackOAuthMessage>;
  slackOAuthComplete: MainMessageInvoker<SlackOAuthCompleteMessage>;
};

export type RendererBridge = {
  // dummy
  ping: RendererMessageInvoker<PingMessage>;
  onPong: RendererCallbackRegistrar<PongMessage>;

  startSlackOAuth: RendererMessageInvoker<StartSlackOAuthMessage>;
  onSlackOAuthComplete: RendererCallbackRegistrar<SlackOAuthCompleteMessage>;
};
