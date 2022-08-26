import { Broadcaster } from '../../base/bridge_handler';
import {
  IntegrationNativeService,
  NativeIntegration,
} from './integration_native_service';

export const createIntegrationNativeService = ({
  integrations,
  broadcast,
}: {
  integrations: readonly NativeIntegration[];
  broadcast: Broadcaster;
}) => {
  const integrationNativeService = new IntegrationNativeService(
    integrations,
    broadcast
  );

  return { integrationNativeService };
};
