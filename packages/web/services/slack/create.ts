import { Config } from '../../base/config';
import { SlackService } from './slack_service';

export const createSlackService = (config: Config['slack']) => {
  const slackService = new SlackService(config);

  return { slackService };
};
