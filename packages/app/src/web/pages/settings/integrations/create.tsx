import { createAddIntegrationPage } from './add_integration/create';
import { createIntegrationsListPage } from './integrations_list/create';
import { IntegrationsSettings } from './integrations';
import {
  IntegrationController,
  IntegrationStore,
} from '../../../services/integration/integration_controller';

export const createIntegrationsSettings = ({
  integrationStore,
  integrationController,
}: {
  integrationStore: IntegrationStore;
  integrationController: IntegrationController;
}) => {
  const { AddIntegrationPage } = createAddIntegrationPage({
    integrationStore,
    integrationController,
  });
  const { IntegrationsListPage } = createIntegrationsListPage({
    integrationStore,
    integrationController,
  });

  const IntegrationsSettingsImpl = () => (
    <IntegrationsSettings
      IntegrationsListPage={IntegrationsListPage}
      AddIntegrationPage={AddIntegrationPage}
    />
  );

  return { IntegrationsSettings: IntegrationsSettingsImpl };
};
