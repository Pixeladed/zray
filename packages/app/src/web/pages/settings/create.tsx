import {
  IntegrationController,
  IntegrationStore,
} from '../../services/integration/integration_controller';
import { createIntegrationsSettings } from './integrations/create';
import { createAccountSettings } from './account/create';
import { SettingsPage } from './settings';

export const createSettingsPage = ({
  integrationStore,
  integrationController,
}: {
  integrationStore: IntegrationStore;
  integrationController: IntegrationController;
}) => {
  const { IntegrationsSettings } = createIntegrationsSettings({
    integrationStore,
    integrationController,
  });

  const { AccountSettings } = createAccountSettings();

  const SettingsPageImpl = () => (
    <SettingsPage
      IntegrationsSettings={IntegrationsSettings}
      AccountSettings={AccountSettings}
    />
  );

  return { SettingsPage: SettingsPageImpl };
};
