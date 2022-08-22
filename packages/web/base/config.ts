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
};

export type Config = typeof config;
