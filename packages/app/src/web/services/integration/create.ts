import { BridgeClient } from '../../base/bridge_client';
import {
  IntegrationController,
  IntegrationStore,
} from './integration_controller';

export const createIntegrationService = ({
  bridgeClient,
}: {
  bridgeClient: BridgeClient;
}) => {
  const integrationStore = new IntegrationStore();
  const integrationController = new IntegrationController(
    integrationStore,
    bridgeClient
  );

  integrationController.loadIntegrations();
  integrationController.loadProfiles();

  return { integrationStore, integrationController };
};
