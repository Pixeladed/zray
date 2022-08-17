import { NavigationService } from '../../navigation/navigation_service';
import { RendererBridge } from '../../process_bridge/api';
import { SlackIntegration } from './slack_integration';

const SLACK_CLIENT_ID = '3955281996480.3924969983590';

export const createSlackIntegration = ({
  navigationService,
  rendererBridge,
}: {
  navigationService: NavigationService;
  rendererBridge: RendererBridge;
}) => {
  const slackIntegration = new SlackIntegration(
    navigationService,
    SLACK_CLIENT_ID,
    rendererBridge
  );
  return { slackIntegration };
};
