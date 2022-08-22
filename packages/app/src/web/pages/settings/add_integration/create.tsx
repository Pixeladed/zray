import { withBridge } from '../../../base/bridge';
import { integrations } from '../../../services/integrations';
import { AddIntegrationPage } from './add_integration';

export const createAddIntegrationPage = (context: Window) => {
  const connect = withBridge(context, bridge => (id: string) => {
    bridge.invoke('integration:connect', { id });
  });

  const AddIntegrationPageImpl = () => (
    <AddIntegrationPage onConnect={connect} integrations={integrations} />
  );
  return { AddIntegrationPage: AddIntegrationPageImpl };
};
