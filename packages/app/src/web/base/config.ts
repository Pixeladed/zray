import { Assert } from '@highbeam/utils';

export type WebConfig = {
  redirectOrigin: string;
  auth0: Auth0Config;
};

export type Auth0Config = {
  audience: string;
  domain: string;
  clientId: string;
};

export const webConfig: WebConfig = {
  redirectOrigin: 'http://localhost:3000',
  auth0: {
    audience: Assert.exists(
      process.env.REACT_APP_AUTH0_AUDIENCE,
      'expected auth0 audience to exist'
    ),
    domain: Assert.exists(
      process.env.REACT_APP_AUTH0_DOMAIN,
      'expected auth0 domain to exist'
    ),
    clientId: Assert.exists(
      process.env.REACT_APP_AUTH0_CLIENT_ID,
      'expected auth0 client id to exist'
    ),
  },
};
