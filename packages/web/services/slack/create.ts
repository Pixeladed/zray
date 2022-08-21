import { config } from '../../base/config';
import { SlackService } from './slack_service';

export const createSlackService = () => {
  const slackService = new SlackService(config.slack);

  return { slackService };
};
