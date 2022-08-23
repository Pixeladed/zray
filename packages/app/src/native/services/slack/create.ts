import { ClientFactory } from '@highbeam/interface';
import { SlackNativeIntegration } from './slack_native_integration';
import { SlackNativeService } from './slack_native_service';
import { SlackNativeStore } from './slack_native_service_store';

const REDIRECT_ORIGIN = 'https://usehighbeamapp.com';
const STORE_NAME = 'slack_native_store';

export const createSlackNativeService = (clientFactory: ClientFactory) => {
  const slackClient = clientFactory.for('slack');
  const slackNativeStore = new SlackNativeStore(STORE_NAME);
  const slackNativeService = new SlackNativeService(
    SlackNativeIntegration,
    REDIRECT_ORIGIN,
    slackClient,
    slackNativeStore
  );
  return { slackNativeService };
};
