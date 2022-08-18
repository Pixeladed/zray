import { OperationResult } from '../provider';
import { SlackIntegration } from './slack_integration';

export const createSlackIntegration = ({
  connect,
}: {
  connect: () => Promise<void>;
}) => {
  const slackIntegration = new SlackIntegration(connect);
  return { slackIntegration };
};
