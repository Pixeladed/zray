import { BridgeClient } from '../../base/bridge_client';
import { NavigationService } from '../../services/navigation/navigation_service';
import { createIntegrationsSettings } from './integrations/create';
import { SettingsPage } from './settings';

export const createSettingsPage = ({
  bridgeClient,
  navigationService,
}: {
  bridgeClient: BridgeClient;
  navigationService: NavigationService;
}) => {
  const { IntegrationsSettings } = createIntegrationsSettings({ bridgeClient });

  const SettingsPageImpl = () => (
    <SettingsPage
      navigationService={navigationService}
      IntegrationsSettings={IntegrationsSettings}
    />
  );

  return { SettingsPage: SettingsPageImpl };
};
