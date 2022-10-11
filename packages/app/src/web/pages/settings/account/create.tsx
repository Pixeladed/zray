import { observer } from 'mobx-react';
import { BridgeClient } from '../../../base/bridge_client';
import { NavigationService } from '../../../services/navigation/navigation_service';
import { AccountSettings } from './account';
import { AccountController } from './account_controller';
import { AccountStore } from './account_store';

export const createAccountSettings = ({
  bridgeClient,
  billingPortalUrl,
  navigationService,
}: {
  bridgeClient: BridgeClient;
  billingPortalUrl: string;
  navigationService: NavigationService;
}) => {
  const store = new AccountStore();
  const controller = new AccountController(
    store,
    bridgeClient,
    navigationService,
    billingPortalUrl
  );

  const AccountSettingsImpl = observer(() => (
    <AccountSettings
      onLogout={controller.logout}
      onBillingPortalOpen={controller.openBillingPortal}
      integrationLimit={store.integrationLimit}
      planName={store.planName}
      init={controller.loadUsage}
    />
  ));

  return { AccountSettings: AccountSettingsImpl };
};
