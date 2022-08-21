export const config = {
  slack: {
    clientId: process.env.SLACK_CLIENT_ID || '',
    clientSecret: process.env.SLACK_CLIENT_SECRET || '',
    stateSecret: process.env.SLACK_STATE_SECRET || '',
  },
};

export type Config = typeof config;
