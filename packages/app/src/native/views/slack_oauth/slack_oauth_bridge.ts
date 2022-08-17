import { ProcessBridge } from '../../../services/process_bridge/process_bridge';
import {
  SlackOAuthMainBridge,
  SlackOAuthCompleteMessage,
  SlackOAuthRendererBridge,
  StartSlackOAuthMessage,
} from './api';

export class SlackOAuthBridge extends ProcessBridge<
  SlackOAuthRendererBridge,
  SlackOAuthMainBridge
> {
  rendererBridgeConfig = (): SlackOAuthRendererBridge => {
    return {
      onSlackOAuthComplete: this.rendererCallbackRegistrar(
        SlackOAuthCompleteMessage
      ),
      startSlackOAuth: this.rendererMessageInvoker(StartSlackOAuthMessage),
    };
  };

  mainBridgeConfig = (): SlackOAuthMainBridge => {
    return {
      onStartSlackOAuth: this.mainCallbackRegistrar(StartSlackOAuthMessage),
      slackOAuthComplete: this.mainMessageInvoker(SlackOAuthCompleteMessage),
    };
  };
}
