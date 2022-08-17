import { NavigationService } from '../../navigation/navigation_service';
import { SlackIntegration } from './slack_integration';

const SLACK_CLIENT_ID = '3955281996480.3924969983590';

export const createSlackIntegration = ({
  navigationService,
  context,
}: {
  navigationService: NavigationService;
  context: Window;
}) => {
  const slackIntegration = new SlackIntegration(
    navigationService,
    SLACK_CLIENT_ID,
    context
  );
  return { slackIntegration };
};
