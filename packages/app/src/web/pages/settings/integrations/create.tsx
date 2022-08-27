import { BridgeClient } from '../../../base/bridge_client';
import { createAddIntegrationPage } from './add_integration/create';
import { createIntegrationsListPage } from './integrations_list/create';
import { IntegrationsSettings } from './integrations';

export const createIntegrationsSettings = ({
  bridgeClient,
}: {
  bridgeClient: BridgeClient;
}) => {
  const { AddIntegrationPage } = createAddIntegrationPage({
    bridgeClient,
  });
  const { IntegrationsListPage } = createIntegrationsListPage({
    bridgeClient,
  });

  const IntegrationsSettingsImpl = () => (
    <IntegrationsSettings
      IntegrationsListPage={IntegrationsListPage}
      AddIntegrationPage={AddIntegrationPage}
    />
  );

  return { IntegrationsSettings: IntegrationsSettingsImpl };
};
