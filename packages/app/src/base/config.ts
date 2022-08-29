import { Assert } from '@highbeam/utils';
import { config as loadDotEnv } from 'dotenv';

loadDotEnv();

export const config = {
  apiOrigin: 'http://localhost:3000',
  redirectOrigin: 'https://usehighbeamapp.com',
  google: {
    clientId: Assert.exists(
      process.env.GOOGLE_CLIENT_ID,
      'expected google client id to exist'
    ),
  },
};

export type Config = typeof config;
