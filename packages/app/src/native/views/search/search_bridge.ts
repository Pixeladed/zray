import {
  MainCallbackRegistrar,
  ProcessBridgeMessage,
  RendererMessageInvoker,
} from '../../../services/process_bridge/message_utils';
import { ProcessBridge } from '../../../services/process_bridge/process_bridge';

export class OpenSettingsMessage extends ProcessBridgeMessage<{
  route?: string;
}> {
  name = 'search:openSettings';
}

export type SearchRendererBridge = {
  openSettings: RendererMessageInvoker<OpenSettingsMessage>;
};

export type SearchMainBridge = {
  onOpenSettings: MainCallbackRegistrar<OpenSettingsMessage>;
};

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
