import {
  IntegrationController,
  IntegrationStore,
} from '../../services/integration/integration_controller';
import { createIntegrationsSettings } from './integrations/create';
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

  const SettingsPageImpl = () => (
    <SettingsPage IntegrationsSettings={IntegrationsSettings} />
  );

  return { SettingsPage: SettingsPageImpl };
};
