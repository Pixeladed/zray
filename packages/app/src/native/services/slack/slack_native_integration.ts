import { Path } from '../../../base/path';
import { NativeIntegration } from '../integration/integration_native_service';

export class SlackNativeIntegration implements NativeIntegration {
  id = 'com.builtin.slack';
  name = 'Slack';
  icon = Path.resource('/integrations/slack/slack.svg');
}
