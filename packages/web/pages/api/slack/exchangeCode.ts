import { config } from '../../../base/config';
import { createSlackService } from '../../../services/slack/create';

const { slackService } = createSlackService(config.slack);

export default slackService.exchangeCode;
