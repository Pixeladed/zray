import { config } from '../../../base/config';
import { gatewayFor } from '../../../services/gateway/gateway';
import { createSlackService } from '../../../services/slack/create';

const { slackService } = createSlackService(config.slack);

export default gatewayFor(slackService);
