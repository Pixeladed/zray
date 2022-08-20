import { createAddIntegrationPage } from './add_integration/create';
import { SettingsPage } from './settings';

export const createSettingsPage = (context: Window) => {
  const { AddIntegrationPage } = createAddIntegrationPage(context);

  const SettingsPageImpl = () => (
    <SettingsPage AddIntegrationsPage={AddIntegrationPage} />
  );

  return { SettingsPage: SettingsPageImpl };
};
