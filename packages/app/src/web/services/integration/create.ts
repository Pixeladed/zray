import { BridgeClient } from 'web/base/bridge_client';
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

  return { integrationStore, integrationController };
};
