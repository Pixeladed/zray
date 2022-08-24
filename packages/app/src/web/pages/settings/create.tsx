import { withBridge } from '../../base/bridge_client';
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

  const init = withBridge(
    context,
    bridge => () => bridge.invoke('page:init', {})
  );

  const SettingsPageImpl = () => (
    <SettingsPage init={init} AddIntegrationsPage={AddIntegrationPage} />
  );

  return { SettingsPage: SettingsPageImpl };
};
