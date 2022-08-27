import { IntegrationProfile } from 'interface/intergration';
import { IntegrationController } from 'web/services/integration/integration_controller';

export class IntegrationListController {
  constructor(private readonly integrationController: IntegrationController) {}

  init = () => {
    this.integrationController.loadIntegrations();
    this.integrationController.loadProfiles();
  };

  remove = (profile: IntegrationProfile) => {
    this.integrationController.remove(profile);
  };
}
