import { getBridge } from '../../base/bridge';
import {
  SettingsBridge,
  SETTINGS_BRIDGE_NAME,
} from '../../native/views/settings/preload';
import { SlackIntegration } from '../../services/integration/slack/slack_integration';
import { AddIntegrationPage } from './add_integration';

export const createAddIntegrationPage = (context: Window) => {
  const bridge = getBridge<SettingsBridge>(context, SETTINGS_BRIDGE_NAME);
  const integrations = [new SlackIntegration(bridge.connectSlack)];

  const AddIntegrationPageImpl = () => (
    <AddIntegrationPage integrations={integrations} />
  );
  return { AddIntegrationPage: AddIntegrationPageImpl };
};
