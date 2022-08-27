import { BridgeClient } from '../../base/bridge_client';
import { createIntegrationsSettings } from './integrations/create';
import { SettingsPage } from './settings';

export const createSettingsPage = ({
  bridgeClient,
}: {
  bridgeClient: BridgeClient;
}) => {
  const { IntegrationsSettings } = createIntegrationsSettings({ bridgeClient });

  const SettingsPageImpl = () => (
    <SettingsPage IntegrationsSettings={IntegrationsSettings} />
  );

  return { SettingsPage: SettingsPageImpl };
};
