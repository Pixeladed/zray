import { NewProfileEvent } from '../../../../../interface/bridge/events';
import { BridgeClient } from '../../../../base/bridge_client';
import { IntegrationController } from '../../../../services/integration/integration_controller';

export class IntegrationListController {
  constructor(
    private readonly integrationController: IntegrationController,
    private readonly bridgeClient: BridgeClient
  ) {}

  init = () => {
    this.integrationController.loadIntegrations();
    this.integrationController.loadProfiles();

    this.bridgeClient.on<NewProfileEvent>('integration:profile:new', () => {
      this.integrationController.loadProfiles();
    });
  };
}
