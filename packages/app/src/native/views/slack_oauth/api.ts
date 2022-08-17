import {
  MainMessageInvoker,
  ProcessBridgeMessage,
  RendererCallbackRegistrar,
} from '../../../services/process_bridge/message_utils';

export const SLACK_OAUTH_BRIDGE_NAMESPACE = 'SlackOAuthProcessBridge';

export class SlackOAuthCompleteMessage extends ProcessBridgeMessage<
  { success: false; cancelled: boolean } | { success: true; data: {} }
> {
  name = 'slack:oauth:success';
}

export type SlackOAuthRendererBridge = {
  onSlackOAuthComplete: RendererCallbackRegistrar<SlackOAuthCompleteMessage>;
};

export type SlackOAuthMainBridge = {
  slackOAuthComplete: MainMessageInvoker<SlackOAuthCompleteMessage>;
};
