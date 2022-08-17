import { ProcessBridge } from '../../../services/process_bridge/process_bridge';
import {
  OpenSettingsMessage,
  SearchMainBridge,
  SearchRendererBridge,
} from './api';

export class SearchBridge extends ProcessBridge<
  SearchRendererBridge,
  SearchMainBridge
> {
  mainBridgeConfig = (): SearchMainBridge => {
    return {
      onOpenSettings: this.mainCallbackRegistrar(OpenSettingsMessage),
    };
  };

  rendererBridgeConfig = (): SearchRendererBridge => {
    return {
      openSettings: this.rendererMessageInvoker(OpenSettingsMessage),
    };
  };
}
