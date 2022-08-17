import { ProcessBridge } from '../../../services/process_bridge/process_bridge';
import {
  SlackOAuthMainBridge,
  SlackOAuthCompleteMessage,
  SlackOAuthRendererBridge,
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
    };
  };

  mainBridgeConfig = (): SlackOAuthMainBridge => {
    return {
      slackOAuthComplete: this.mainMessageInvoker(SlackOAuthCompleteMessage),
    };
  };
}
