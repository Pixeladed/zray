import { withBridge } from '../../../base/bridge';
import { AddIntegrationPage } from './add_integration';

export const createAddIntegrationPage = (context: Window) => {
  const connect = withBridge(context, bridge => (id: string) => {
    bridge.invoke('integration:connect', { id });
  });
  const getIntegrations = withBridge(
    context,
    bridge => () => bridge.integrations
  );

  const AddIntegrationPageImpl = () => (
    <AddIntegrationPage onConnect={connect} getIntegrations={getIntegrations} />
  );
  return { AddIntegrationPage: AddIntegrationPageImpl };
};
