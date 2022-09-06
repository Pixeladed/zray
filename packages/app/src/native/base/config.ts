import { config as loadDotEnv } from 'dotenv';
import { env } from '../../base/env';

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
  apiOrigin: env('API_ORIGIN'),
  redirectOrigin: env('REDIRECT_ORIGIN'),
  auth0: {
    audience: env('AUTH0_AUDIENCE'),
    domain: env('AUTH0_DOMAIN'),
    clientId: env('AUTH0_CLIENT_ID'),
  },
};
