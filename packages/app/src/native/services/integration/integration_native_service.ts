import { ConnectIntegrationParam } from '../../../interface/bridge';
import { Handler } from '../../base/bridge_handler';
import { SlackNativeService } from '../slack/slack_native_service';

export class IntegrationNativeService {
  constructor(private readonly slackNativeService: SlackNativeService) {}

  connect: Handler<ConnectIntegrationParam> = (event, { name }) => {
    switch (name) {
      case 'slack':
        return this.slackNativeService.startOAuth();
      default:
        throw new Error(`Unsupported integration ${name}`);
    }
  };
}
