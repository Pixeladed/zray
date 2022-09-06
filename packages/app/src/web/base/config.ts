import { env } from '../../base/env';

export type WebConfig = {
  auth0: Auth0Config;
};

export type Auth0Config = {
  audience: string;
  domain: string;
  clientId: string;
};

export const webConfig: WebConfig = {
  auth0: {
    audience: env('REACT_APP_AUTH0_AUDIENCE'),
    domain: env('REACT_APP_AUTH0_DOMAIN'),
    clientId: env('REACT_APP_AUTH0_CLIENT_ID'),
  },
};
