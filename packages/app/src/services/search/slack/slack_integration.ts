import { PathGenerator } from '../../../base/path';
import { Integration, OperationResult, Provider } from '../provider';

export class SlackIntegration implements Integration {
  constructor(private readonly getResourcesPath: PathGenerator) {}

  name = 'Slack';
  icon = this.getResourcesPath('/public/integrations/slack/slack.svg');

  connect = async (): Promise<OperationResult<Provider>> => {
    return { success: false, cancelled: false };
  };
}
