import {
  MainCallbackRegistrar,
  MainMessageInvoker,
  ProcessBridgeMessage,
  RendererCallbackRegistrar,
  RendererMessageInvoker,
} from '../../../services/process_bridge/message_utils';

export const SETTINGS_BRIDGE_NAMESPACE = 'SettingsProcessBridge';

export class SettingsStartSlackOAuthMessage extends ProcessBridgeMessage<{
  oAuthUrl: string;
  redirectUrl: string;
}> {
  name = 'settings:slack:oauth:start';
}

export class SettingsSlackOAuthCompleteMessage extends ProcessBridgeMessage<
  { success: false; cancelled: boolean } | { success: true; data: {} }
> {
  name = 'settings:slack:oauth:start';
}

export type SettingsRendererBridge = {
  startSlackOAuth: RendererMessageInvoker<SettingsStartSlackOAuthMessage>;
  onSlackOAuthComplete: RendererCallbackRegistrar<SettingsSlackOAuthCompleteMessage>;
};

export type SettingsMainBridge = {
  onStartSlackOAuth: MainCallbackRegistrar<SettingsStartSlackOAuthMessage>;
  slackOAuthComplete: MainMessageInvoker<SettingsSlackOAuthCompleteMessage>;
};
