import { IntegrationStore } from '../../services/integration/integration_store';
import { createAddIntegrationPage } from './add_integration/create';
import { SettingsPage } from './settings';

export const createSettingsPage = ({
  context,
  integrationStore,
}: {
  context: Window;
  integrationStore: IntegrationStore;
}) => {
  const { AddIntegrationPage } = createAddIntegrationPage({
    context,
    integrationStore,
  });

  const SettingsPageImpl = () => (
    <SettingsPage AddIntegrationsPage={AddIntegrationPage} />
  );

  return { SettingsPage: SettingsPageImpl };
};
