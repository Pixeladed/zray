import { createSlackService } from '../../../services/slack/create';

const { slackService } = createSlackService();

export default slackService.authorize;
