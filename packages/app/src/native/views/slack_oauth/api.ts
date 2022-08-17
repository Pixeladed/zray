import {
  MainCallbackRegistrar,
  MainMessageInvoker,
  ProcessBridgeMessage,
  RendererCallbackRegistrar,
  RendererMessageInvoker,
} from '../../../services/process_bridge/message_utils';

export const SLACK_OAUTH_BRIDGE_NAMESPACE = 'SlackOAuthProcessBridge';

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

export type SlackOAuthRendererBridge = {
  startSlackOAuth: RendererMessageInvoker<StartSlackOAuthMessage>;
  onSlackOAuthComplete: RendererCallbackRegistrar<SlackOAuthCompleteMessage>;
};

export type SlackOAuthMainBridge = {
  onStartSlackOAuth: MainCallbackRegistrar<StartSlackOAuthMessage>;
  slackOAuthComplete: MainMessageInvoker<SlackOAuthCompleteMessage>;
};
