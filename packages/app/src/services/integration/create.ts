import { NavigationService } from '../navigation/navigation_service';
import { createSlackIntegration } from './slack/create';

export const createIntegrations = ({
  navigationService,
  context,
}: {
  navigationService: NavigationService;
  context: Window;
}) => {
  const { slackIntegration } = createSlackIntegration({
    navigationService,
    context,
  });

  return { slackIntegration };
};
