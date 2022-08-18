import {
  ProcessBridgeMessage,
  RendererMessageInvoker,
} from '../../../services/process_bridge/message_utils';

export class OpenSettingsMessage extends ProcessBridgeMessage<{
  route?: string;
}> {
  name = 'search:openSettings';
}

export type SearchRendererBridge = {
  openSettings: RendererMessageInvoker<OpenSettingsMessage>;
};
