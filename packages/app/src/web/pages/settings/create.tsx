import { BridgeClient } from '../../base/bridge_client';
import { createAddIntegrationPage } from './add_integration/create';
import { SettingsPage } from './settings';

export const createSettingsPage = ({
  bridgeClient,
}: {
  bridgeClient: BridgeClient;
}) => {
  const { AddIntegrationPage } = createAddIntegrationPage({
    bridgeClient,
  });

  const SettingsPageImpl = () => (
    <SettingsPage AddIntegrationsPage={AddIntegrationPage} />
  );

  return { SettingsPage: SettingsPageImpl };
};
