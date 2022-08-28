import { observer } from 'mobx-react';
import {
  IntegrationController,
  IntegrationStore,
} from '../../../../services/integration/integration_controller';
import { AddIntegrationPage } from './add_integration';

export const createAddIntegrationPage = ({
  integrationStore,
  integrationController,
}: {
  integrationStore: IntegrationStore;
  integrationController: IntegrationController;
}) => {
  const AddIntegrationPageImpl = observer(() => (
    <AddIntegrationPage
      init={integrationController.loadIntegrations}
      onConnect={integrationController.connect}
      integrations={integrationStore.integrations}
    />
  ));

  return { AddIntegrationPage: AddIntegrationPageImpl };
};
