import type {
  PingMessage,
  PongMessage,
  StartSlackOAuthMessage,
} from './messages';
import type {
  MainMessageInvoker,
  MessageCallbackRegistrar,
  RendererMessageInvoker,
} from './message_utils';

export type MainApi = {
  onPing: MessageCallbackRegistrar<PingMessage>;
  pong: MainMessageInvoker<PongMessage>;
};

export type RendererApi = {
  ping: RendererMessageInvoker<PingMessage>;
  startSlackOAuth: RendererMessageInvoker<StartSlackOAuthMessage>;
  onPong: MessageCallbackRegistrar<PongMessage>;
};
