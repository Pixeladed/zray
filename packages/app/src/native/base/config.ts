import content from '../../config.json';
import { Assert } from '@highbeam/utils';

export const env = (label: string) => {
  const val = (content as any)[label as any] as string | undefined;
  return Assert.exists(val, `expected config ${label} to exist`);
};

export type NativeConfig = {
  apiOrigin: string;
  redirectOrigin: string;
  auth0: Auth0Config;
};

export type Auth0Config = {
  audience: string;
  domain: string;
  clientId: string;
  keytarName: string;
};

export const nativeConfig: NativeConfig = {
  apiOrigin: env('API_ORIGIN'),
  redirectOrigin: env('REDIRECT_ORIGIN'),
  auth0: {
    audience: env('AUTH0_AUDIENCE'),
    domain: env('AUTH0_DOMAIN'),
    clientId: env('AUTH0_CLIENT_ID'),
    keytarName: 'com.highbeam.app',
  },
};
