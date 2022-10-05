import { AccountSettings } from './account';

export const createAccountSettings = () => {
  const AccountSettingsImpl = () => <AccountSettings />;

  return { AccountSettings: AccountSettingsImpl };
};
