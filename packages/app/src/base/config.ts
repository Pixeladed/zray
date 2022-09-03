import { Assert } from '@highbeam/utils';
import { config as loadDotEnv } from 'dotenv';

loadDotEnv();

export const config = {
  apiOrigin: 'http://localhost:3000',
  redirectOrigin: 'https://usehighbeamapp.com',
  auth0: {
    audience: Assert.exists(
      process.env.AUTH0_AUDIENCE,
      'expected auth0 audience to exist'
    ),
    domain: Assert.exists(
      process.env.AUTH0_DOMAIN,
      'expected auth0 domain to exist'
    ),
    clientId: Assert.exists(
      process.env.AUTH0_CLIENT_ID,
      'expected auth0 client id to exist'
    ),
  },
};

export type Config = typeof config;
