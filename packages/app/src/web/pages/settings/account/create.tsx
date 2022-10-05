import { BridgeClient } from '../../../base/bridge_client';
import { NavigationService } from '../../../services/navigation/navigation_service';
import { AccountSettings } from './account';
import { AccountController } from './account_controller';

export const createAccountSettings = ({
  bridgeClient,
  billingPortalUrl,
  navigationService,
}: {
  bridgeClient: BridgeClient;
  billingPortalUrl: string;
  navigationService: NavigationService;
}) => {
  const controller = new AccountController(
    bridgeClient,
    navigationService,
    billingPortalUrl
  );
  const AccountSettingsImpl = () => (
    <AccountSettings
      onLogout={controller.logout}
      onBillingPortalOpen={controller.openBillingPortal}
    />
  );

  return { AccountSettings: AccountSettingsImpl };
};
