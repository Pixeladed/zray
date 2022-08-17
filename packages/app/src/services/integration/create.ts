import { NavigationService } from '../navigation/navigation_service';
import { createSlackIntegration } from './slack/create';

export const createIntegrations = ({
  navigationService,
}: {
  navigationService: NavigationService;
}) => {
  const { slackIntegration } = createSlackIntegration({
    navigationService,
  });

  return { slackIntegration };
};
