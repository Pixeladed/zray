import {
  MainCallbackRegistrar,
  MainMessageInvoker,
  ProcessBridgeMessage,
  RendererCallbackRegistrar,
  RendererMessageInvoker,
} from '../../process_bridge/message_utils';
import { ProcessBridge } from '../../process_bridge/process_bridge';

export class SlackBridge extends ProcessBridge<
  SlackRendererBridge,
  SlackMainBridge
> {
  rendererBridgeConfig = (): SlackRendererBridge => {
    return {
      onSlackOAuthComplete: this.rendererCallbackRegistrar(
        SlackOAuthCompleteMessage
      ),
      startSlackOAuth: this.rendererMessageInvoker(StartSlackOAuthMessage),
    };
  };

  mainBridgeConfig = (): SlackMainBridge => {
    return {
      onStartSlackOAuth: this.mainCallbackRegistrar(StartSlackOAuthMessage),
      slackOAuthComplete: this.mainMessageInvoker(SlackOAuthCompleteMessage),
    };
  };
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

export type SlackRendererBridge = {
  startSlackOAuth: RendererMessageInvoker<StartSlackOAuthMessage>;
  onSlackOAuthComplete: RendererCallbackRegistrar<SlackOAuthCompleteMessage>;
};

export type SlackMainBridge = {
  onStartSlackOAuth: MainCallbackRegistrar<StartSlackOAuthMessage>;
  slackOAuthComplete: MainMessageInvoker<SlackOAuthCompleteMessage>;
};
