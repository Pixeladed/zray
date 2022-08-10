import { Path, PathGenerator } from '../../../base/path';
import { Integration, OperationResult, Provider } from '../provider';

const ICON_PATH = Path.resource('/public/integrations/slack/slack.svg');

export class SlackIntegration extends Integration {
  constructor() {
    super('Slack', ICON_PATH);
  }

  connect = async (): Promise<OperationResult<Provider>> => {
    return { success: false, cancelled: false };
  };
}
