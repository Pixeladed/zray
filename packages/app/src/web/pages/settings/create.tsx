import {
  IntegrationController,
  IntegrationStore,
} from '../../services/integration/integration_controller';
import { createIntegrationsSettings } from './integrations/create';
import { createAccountSettings } from './account/create';
import { SettingsPage } from './settings';
import { BridgeClient } from '../../base/bridge_client';

export const createSettingsPage = ({
  integrationStore,
  integrationController,
  bridgeClient,
}: {
  integrationStore: IntegrationStore;
  integrationController: IntegrationController;
  bridgeClient: BridgeClient;
}) => {
  const { IntegrationsSettings } = createIntegrationsSettings({
    integrationStore,
    integrationController,
  });

  const { AccountSettings } = createAccountSettings({
    bridgeClient,
  });

  const SettingsPageImpl = () => (
    <SettingsPage
      IntegrationsSettings={IntegrationsSettings}
      AccountSettings={AccountSettings}
    />
  );

  return { SettingsPage: SettingsPageImpl };
};
