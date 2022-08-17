import {
  MainCallbackRegistrar,
  ProcessBridgeMessage,
  RendererMessageInvoker,
} from '../../../services/process_bridge/message_utils';

export const SEARCH_BRIDGE_NAMESPACE = 'SearchProcessBridge';

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
