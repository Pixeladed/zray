import { Assert } from '@highbeam/utils';

export const config = {
  slack: {
    clientId: Assert.exists(
      process.env.SLACK_CLIENT_ID,
      'expected SLACK_CLIENT_ID to exist'
    ),
    clientSecret: Assert.exists(
      process.env.SLACK_CLIENT_SECRET,
      'expected SLACK_CLIENT_SECRET to exist'
    ),
    stateSecret: Assert.exists(
      process.env.SLACK_STATE_SECRET,
      'expected SLACK_STATE_SECRET to exist'
    ),
  },
  google: {
    clientId: Assert.exists(
      process.env.GOOGLE_CLIENT_ID,
      'expected GOOGLE_CLIENT_ID to exist'
    ),
    clientSecret: Assert.exists(
      process.env.GOOGLE_CLIENT_SECRET,
      'expected GOOGLE_CLIENT_SECRET to exist'
    ),
    redirectUrl: Assert.exists(
      process.env.GOOGLE_REDIRECT_URL,
      'expected GOOGLE_CLIENT_SECRET to exist'
    ),
  },
};

export type Config = typeof config;
