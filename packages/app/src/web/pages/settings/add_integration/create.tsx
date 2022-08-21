import { SlackIntegration } from '../../../services/integration/slack/slack_integration';
import { AddIntegrationPage } from './add_integration';

const getSettingsBridge = (context: Window) => ({} as any);

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
