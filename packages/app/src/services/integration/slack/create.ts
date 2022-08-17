import { NavigationService } from '../../navigation/navigation_service';
import { getRendererBridge } from '../../process_bridge/renderer';
import { SlackRendererBridge } from './slack_bridge';
import { SlackIntegration, SLACK_BRIDGE_NAMESPACE } from './slack_integration';

const SLACK_CLIENT_ID = '3955281996480.3924969983590';

export const createSlackIntegration = ({
  navigationService,
  context,
}: {
  navigationService: NavigationService;
  context: Window;
}) => {
  const rendererBridge = getRendererBridge<SlackRendererBridge>(
    context,
    SLACK_BRIDGE_NAMESPACE
  );
  const slackIntegration = new SlackIntegration(
    navigationService,
    SLACK_CLIENT_ID,
    rendererBridge
  );
  return { slackIntegration };
};
