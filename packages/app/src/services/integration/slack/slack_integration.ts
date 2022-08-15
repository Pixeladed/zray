import { Path } from '../../../base/path';
import { OperationResult, Provider } from '../provider';
import { Integration } from '../integration';

const ICON_PATH = Path.resource('/integrations/slack/slack.svg');

export class SlackIntegration extends Integration {
  constructor() {
    super('Slack', ICON_PATH);
  }

  connect = async (): Promise<OperationResult<Provider>> => {
    return { success: false, cancelled: false };
  };
}
