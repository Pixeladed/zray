import { ClientFactory } from '@highbeam/interface';
import { config } from '../base/config';
import { createSlackNativeService } from './services/slack/create';

export const clientFactory = new ClientFactory(config.apiOrigin);
const { slackNativeService } = createSlackNativeService(clientFactory);
export const integrations = [slackNativeService];
