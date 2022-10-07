import { Broadcaster } from '../../base/bridge_handler';
import { UsageNativeService } from '../usage/usage_native_service';
import {
  IntegrationNativeService,
  NativeIntegration,
} from './integration_native_service';

export const createIntegrationNativeService = ({
  integrations,
  broadcast,
  usageNativeService,
}: {
  integrations: readonly NativeIntegration[];
  broadcast: Broadcaster;
  usageNativeService: UsageNativeService;
}) => {
  const integrationNativeService = new IntegrationNativeService(
    integrations,
    broadcast,
    usageNativeService
  );

  return { integrationNativeService };
};
