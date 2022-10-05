import {
  IntegrationController,
  IntegrationStore,
} from '../../services/integration/integration_controller';
import { createIntegrationsSettings } from './integrations/create';
import { createAccountSettings } from './account/create';
import { SettingsPage } from './settings';
import { BridgeClient } from '../../base/bridge_client';
import { NavigationService } from '../../services/navigation/navigation_service';

export const createSettingsPage = ({
  integrationStore,
  integrationController,
  bridgeClient,
  billingPortalUrl,
  navigationService,
}: {
  integrationStore: IntegrationStore;
  integrationController: IntegrationController;
  bridgeClient: BridgeClient;
  navigationService: NavigationService;
  billingPortalUrl: string;
}) => {
  const { IntegrationsSettings } = createIntegrationsSettings({
    integrationStore,
    integrationController,
  });

  const { AccountSettings } = createAccountSettings({
    bridgeClient,
    billingPortalUrl,
    navigationService,
  });

  const SettingsPageImpl = () => (
    <SettingsPage
      IntegrationsSettings={IntegrationsSettings}
      AccountSettings={AccountSettings}
    />
  );

  return { SettingsPage: SettingsPageImpl };
};
