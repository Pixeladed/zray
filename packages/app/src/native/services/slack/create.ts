import { SlackNativeService } from './slack_native_service';

const SLACK_CLIENT_ID = '3955281996480.3924969983590';
const REDIRECT_ORIGIN = 'https://usehighbeamapp.com';

export const createSlackNativeService = () => {
  const slackNativeService = new SlackNativeService(
    SLACK_CLIENT_ID,
    REDIRECT_ORIGIN
  );
  return { slackNativeService };
};
