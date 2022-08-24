import { BridgeClient } from '../../base/bridge_client';
import { NavigationService } from '../../services/navigation/navigation_service';
import { createAddIntegrationPage } from './add_integration/create';
import { SettingsPage } from './settings';

export const createSettingsPage = ({
  bridgeClient,
  navigationService,
}: {
  bridgeClient: BridgeClient;
  navigationService: NavigationService;
}) => {
  const { AddIntegrationPage } = createAddIntegrationPage({
    bridgeClient,
  });

  const SettingsPageImpl = () => (
    <SettingsPage
      navigationService={navigationService}
      AddIntegrationsPage={AddIntegrationPage}
    />
  );

  return { SettingsPage: SettingsPageImpl };
};
