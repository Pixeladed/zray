import { observer } from 'mobx-react';
import { BridgeClient } from '../../../../base/bridge_client';
import { createIntegrationService } from '../../../../services/integration/create';
import { IntegrationsListPage } from './integrations_list';
import { IntegrationListController } from './integrations_list_controller';

export const createIntegrationsListPage = ({
  bridgeClient,
}: {
  bridgeClient: BridgeClient;
}) => {
  const { integrationController, integrationStore } = createIntegrationService({
    bridgeClient,
  });
  const controller = new IntegrationListController(integrationController);
  const IntegrationsListPageImpl = observer(() => (
    <IntegrationsListPage
      init={controller.init}
      onRemove={controller.remove}
      profiles={integrationStore.profilesWithIntegration.get()}
    />
  ));

  return { IntegrationsListPage: IntegrationsListPageImpl };
};
