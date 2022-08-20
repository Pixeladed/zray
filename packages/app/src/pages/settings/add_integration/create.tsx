import { getBridge } from '../../../base/bridge';
import { SettingsBridge } from '../../../native/views/settings/preload';
import { SlackIntegration } from '../../../services/integration/slack/slack_integration';
import { AddIntegrationPage } from './add_integration';

const SETTINGS_BRIDGE_NAME = 'settingsBridge';
const getSettingsBridge = (context: Window) =>
  getBridge<SettingsBridge>(context, SETTINGS_BRIDGE_NAME);

export const createAddIntegrationPage = (context: Window) => {
  const connectSlack = () => {
    getSettingsBridge(context).connectSlack();
  };

  const integrations = [new SlackIntegration(connectSlack)];

  const AddIntegrationPageImpl = () => (
    <AddIntegrationPage integrations={integrations} />
  );
  return { AddIntegrationPage: AddIntegrationPageImpl };
};
