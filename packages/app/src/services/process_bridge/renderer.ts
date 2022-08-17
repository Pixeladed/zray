import {
  SearchRendererBridge,
  SEARCH_BRIDGE_NAMESPACE,
} from '../../native/views/search/api';
import {
  SettingsRendererBridge,
  SETTINGS_BRIDGE_NAMESPACE,
} from '../../native/views/settings/api';
import {
  SlackOAuthRendererBridge,
  SLACK_OAUTH_BRIDGE_NAMESPACE,
} from '../../native/views/slack_oauth/api';

export const getRendererBridge = <T extends keyof BridgedWindow>(
  context: Window,
  namespace: T
): BridgedWindow[T] => {
  if (namespace in context) {
    return context[namespace] as BridgedWindow[T];
  }

  throw new Error(
    `ProcessBridge in namespace ${namespace} does not exist in context`
  );
};

declare global {
  interface BridgedWindow {
    [SEARCH_BRIDGE_NAMESPACE]: SearchRendererBridge;
    [SETTINGS_BRIDGE_NAMESPACE]: SettingsRendererBridge;
    [SLACK_OAUTH_BRIDGE_NAMESPACE]: SlackOAuthRendererBridge;
  }

  interface Window extends BridgedWindow {}
}
