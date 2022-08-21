import { withBridge } from '../../../base/bridge';
import { SlackIntegration } from '../../../services/integration/slack/slack_integration';
import { AddIntegrationPage } from './add_integration';

export const createAddIntegrationPage = (context: Window) => {
  const connectSlack = withBridge(context, bridge => bridge.connectSlack);

  const integrations = [new SlackIntegration(connectSlack)];

  const AddIntegrationPageImpl = () => (
    <AddIntegrationPage integrations={integrations} />
  );
  return { AddIntegrationPage: AddIntegrationPageImpl };
};
