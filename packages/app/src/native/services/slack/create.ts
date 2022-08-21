import { Network } from '../../../base/network';
import { SlackNativeService } from './slack_native_service';

const REDIRECT_ORIGIN = 'https://usehighbeamapp.com';

export const createSlackNativeService = (network: Network) => {
  const slackNativeService = new SlackNativeService(REDIRECT_ORIGIN, network);
  return { slackNativeService };
};
