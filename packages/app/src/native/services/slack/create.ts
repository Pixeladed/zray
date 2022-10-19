import { ClientFactory } from '@highbeam/interface';
import { Crypt } from '../../base/crypt';
import { SlackNativeService } from './slack_native_service';
import { SlackNativeStore } from './slack_native_store';

const STORE_NAME = 'slack_native_store';

export const createSlackNativeService = ({
  redirectOrigin,
  clientFactory,
  crypt,
}: {
  redirectOrigin: string;
  clientFactory: ClientFactory;
  crypt: Crypt;
}) => {
  const slackClient = clientFactory.for('slack');
  const slackNativeStore = new SlackNativeStore(STORE_NAME, crypt);
  const slackNativeService = new SlackNativeService(
    redirectOrigin,
    slackClient,
    slackNativeStore
  );
  return { slackNativeService };
};
