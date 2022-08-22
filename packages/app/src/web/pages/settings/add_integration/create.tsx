import { IntegrationName } from '../../../../interface/bridge';
import { withBridge } from '../../../base/bridge';
import { integrations } from '../../../services/integrations';
import { AddIntegrationPage } from './add_integration';

export const createAddIntegrationPage = (context: Window) => {
  const connect = withBridge(context, bridge => (name: IntegrationName) => {
    bridge.invoke('integration:connect', { name });
  });

  const AddIntegrationPageImpl = () => (
    <AddIntegrationPage onConnect={connect} integrations={integrations} />
  );
  return { AddIntegrationPage: AddIntegrationPageImpl };
};
