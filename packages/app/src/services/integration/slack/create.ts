import { NavigationService } from '../../navigation/navigation_service';
import { SlackIntegration } from './slack_integration';

const SLACK_CLIENT_ID = '9ac02d565963241906d2c4277297bbd9';

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
