import { observer } from 'mobx-react';
import { withBridge } from '../../../base/bridge_client';
import { IntegrationStore } from '../../../services/integration/integration_store';
import { AddIntegrationPage } from './add_integration';

export const createAddIntegrationPage = ({
  context,
  integrationStore,
}: {
  context: Window;
  integrationStore: IntegrationStore;
}) => {
  const connect = withBridge(context, bridge => (id: string) => {
    bridge.invoke('integration:connect', { id });
  });

  const AddIntegrationPageImpl = observer(() => (
    <AddIntegrationPage
      onConnect={connect}
      integrations={integrationStore.integrations}
    />
  ));

  return { AddIntegrationPage: AddIntegrationPageImpl };
};
