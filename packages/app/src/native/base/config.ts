import { Assert } from '@highbeam/utils';
import { config as loadDotEnv } from 'dotenv';

loadDotEnv();

export type NativeConfig = {
  apiOrigin: string;
  redirectOrigin: string;
  auth0: Auth0Config;
};

export type Auth0Config = {
  audience: string;
  domain: string;
  clientId: string;
};

export const nativeConfig: NativeConfig = {
  apiOrigin: 'http://localhost:3000',
  redirectOrigin: 'https://usehighbeamapp.com',
  auth0: {
    audience: Assert.exists(
      process.env.AUTH0_AUDIENCE,
      'expected native auth0 audience to exist'
    ),
    domain: Assert.exists(
      process.env.AUTH0_DOMAIN,
      'expected native auth0 domain to exist'
    ),
    clientId: Assert.exists(
      process.env.AUTH0_CLIENT_ID,
      'expected native auth0 client id to exist'
    ),
  },
};
