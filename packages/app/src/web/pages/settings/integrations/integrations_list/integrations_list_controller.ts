import { IntegrationProfile } from '../../../../../interface/intergration';
import { IntegrationController } from '../../../../services/integration/integration_controller';

export class IntegrationListController {
  constructor(private readonly integrationController: IntegrationController) {}

  remove = (profile: IntegrationProfile) => {
    this.integrationController.remove(profile);
  };
}
