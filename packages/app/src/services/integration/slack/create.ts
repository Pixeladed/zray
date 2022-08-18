import { SettingsRendererBridge } from '../../../native/views/settings/api';
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
  const rendererBridge = getRendererBridge<SettingsRendererBridge>(context);
  const slackIntegration = new SlackIntegration(
    navigationService,
    SLACK_CLIENT_ID,
    rendererBridge
  );
  return { slackIntegration };
};
