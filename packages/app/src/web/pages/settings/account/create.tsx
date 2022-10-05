import { BridgeClient } from '../../../base/bridge_client';
import { AccountSettings } from './account';
import { AccountController } from './account_controller';

export const createAccountSettings = ({
  bridgeClient,
}: {
  bridgeClient: BridgeClient;
}) => {
  const controller = new AccountController(bridgeClient);
  const AccountSettingsImpl = () => (
    <AccountSettings onLogout={controller.logout} />
  );

  return { AccountSettings: AccountSettingsImpl };
};
