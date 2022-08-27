import { observer } from 'mobx-react';
import { BridgeClient } from '../../../../base/bridge_client';
import { createIntegrationService } from '../../../../services/integration/create';
import { AddIntegrationPage } from './add_integration';

export const createAddIntegrationPage = ({
  bridgeClient,
}: {
  bridgeClient: BridgeClient;
}) => {
  const { integrationController, integrationStore } = createIntegrationService({
    bridgeClient,
  });

  const AddIntegrationPageImpl = observer(() => (
    <AddIntegrationPage
      init={integrationController.loadIntegrations}
      onConnect={integrationController.connect}
      integrations={integrationStore.integrations}
    />
  ));

  return { AddIntegrationPage: AddIntegrationPageImpl };
};
