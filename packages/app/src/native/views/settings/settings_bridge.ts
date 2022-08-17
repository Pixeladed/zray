import { ProcessBridge } from '../../../services/process_bridge/process_bridge';
import {
  SettingsRendererBridge,
  SettingsMainBridge,
  SettingsSlackOAuthCompleteMessage,
  SettingsStartSlackOAuthMessage,
} from './api';

export class SettingsBridge extends ProcessBridge<
  SettingsRendererBridge,
  SettingsMainBridge
> {
  rendererBridgeConfig = (): SettingsRendererBridge => {
    return {
      onSlackOAuthComplete: this.rendererCallbackRegistrar(
        SettingsSlackOAuthCompleteMessage
      ),
      startSlackOAuth: this.rendererMessageInvoker(
        SettingsStartSlackOAuthMessage
      ),
    };
  };

  mainBridgeConfig = (): SettingsMainBridge => {
    return {
      onStartSlackOAuth: this.mainCallbackRegistrar(
        SettingsStartSlackOAuthMessage
      ),
      slackOAuthComplete: this.mainMessageInvoker(
        SettingsSlackOAuthCompleteMessage
      ),
    };
  };
}
