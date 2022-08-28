import { observer } from 'mobx-react';
import {
  IntegrationController,
  IntegrationStore,
} from '../../../../services/integration/integration_controller';
import { IntegrationsListPage } from './integrations_list';
import { IntegrationListController } from './integrations_list_controller';

export const createIntegrationsListPage = ({
  integrationStore,
  integrationController,
}: {
  integrationStore: IntegrationStore;
  integrationController: IntegrationController;
}) => {
  const controller = new IntegrationListController(integrationController);
  const IntegrationsListPageImpl = observer(() => (
    <IntegrationsListPage
      onRemove={controller.remove}
      profiles={integrationStore.profilesWithIntegration.get()}
    />
  ));

  return { IntegrationsListPage: IntegrationsListPageImpl };
};
