import {
  IntegrationNativeService,
  NativeIntegration,
} from './integration_native_service';

export const createIntegrationNativeService = ({
  integrations,
}: {
  integrations: readonly NativeIntegration[];
}) => {
  const integrationNativeService = new IntegrationNativeService(integrations);

  return { integrationNativeService };
};
