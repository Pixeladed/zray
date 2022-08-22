import { Client, ClientFactory } from '@highbeam/interface';
import { SlackNativeService } from './slack_native_service';

const REDIRECT_ORIGIN = 'https://usehighbeamapp.com';

export const createSlackNativeService = (clientFactory: ClientFactory) => {
  const slackClient = clientFactory.for('slack');
  const slackNativeService = new SlackNativeService(
    REDIRECT_ORIGIN,
    slackClient
  );
  return { slackNativeService };
};
