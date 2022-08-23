import { Path } from '../../../base/path';
import { IntegrationInfo } from '../../../interface/intergration';

export const SlackNativeIntegration: IntegrationInfo = {
  id: 'com.builtin.slack',
  name: 'Slack',
  icon: Path.resource('/integrations/slack/slack.svg'),
};
