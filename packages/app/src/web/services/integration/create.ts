import { BridgeClient } from '../../base/bridge_client';
import { AnalyticsService } from '../analytics/analytics_service';
import {
  IntegrationController,
  IntegrationStore,
} from './integration_controller';

export const createIntegrationService = ({
  bridgeClient,
  analyticsService,
}: {
  bridgeClient: BridgeClient;
  analyticsService: AnalyticsService;
}) => {
  const integrationStore = new IntegrationStore();
  const integrationController = new IntegrationController(
    integrationStore,
    bridgeClient,
    analyticsService
  );

  return { integrationStore, integrationController };
};
