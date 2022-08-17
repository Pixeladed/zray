import {
  SettingsRendererBridge,
  SETTINGS_BRIDGE_NAMESPACE,
} from '../../../native/views/settings/api';
import { NavigationService } from '../../navigation/navigation_service';
import { getRendererBridge } from '../../process_bridge/renderer';
import { SlackIntegration } from './slack_integration';

const SLACK_CLIENT_ID = '3955281996480.3924969983590';

export const createSlackIntegration = ({
  navigationService,
  context,
}: {
  navigationService: NavigationService;
  context: Window;
}) => {
  const rendererBridge = getRendererBridge(context, SETTINGS_BRIDGE_NAMESPACE);
  const slackIntegration = new SlackIntegration(
    navigationService,
    SLACK_CLIENT_ID,
    rendererBridge
  );
  return { slackIntegration };
};
