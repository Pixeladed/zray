import { SlackIntegration } from './slack/slack_integration';

export class IntegrationService {
  private integrations = [new SlackIntegration()];

  // this could be dynamic in the future
  findIntegrations = () => {
    return this.integrations;
  };
}
