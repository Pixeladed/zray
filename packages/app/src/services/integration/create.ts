import { NavigationService } from '../navigation/navigation_service';
import { RendererBridge } from '../process_bridge/api';
import { createSlackIntegration } from './slack/create';

export const createIntegrations = ({
  navigationService,
  rendererBridge,
}: {
  navigationService: NavigationService;
  rendererBridge: RendererBridge;
}) => {
  const { slackIntegration } = createSlackIntegration({
    navigationService,
    rendererBridge,
  });

  return { slackIntegration };
};
