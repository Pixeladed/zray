import { ClientFactory } from '@highbeam/interface';
import { SlackNativeService } from './slack_native_service';
import { SlackNativeStore } from './slack_native_store';

const STORE_NAME = 'slack_native_store';

export const createSlackNativeService = ({
  redirectOrigin,
  clientFactory,
}: {
  redirectOrigin: string;
  clientFactory: ClientFactory;
}) => {
  const slackClient = clientFactory.for('slack');
  const slackNativeStore = new SlackNativeStore(STORE_NAME);
  const slackNativeService = new SlackNativeService(
    redirectOrigin,
    slackClient,
    slackNativeStore
  );
  return { slackNativeService };
};
