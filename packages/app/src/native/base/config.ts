import content from '../../config.json';
import { Assert } from '@highbeam/utils';

export const env = (label: string) => {
  const val = maybeEnv(label);
  return Assert.exists(val, `expected config ${label} to exist`);
};

export const maybeEnv = (label: string) => {
  const val = (content as any)[label as any] as string | undefined;
  return val;
};

export type NativeConfig = {
  apiOrigin: string;
  redirectOrigin: string;
  auth0: Auth0Config;
  update: UpdateConfig;
  amplitudeApiKey?: string;
};

export type Auth0Config = {
  audience: string;
  domain: string;
  clientId: string;
  keytarName: string;
};

export type UpdateConfig = {
  url: string;
  platform: NodeJS.Platform;
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
  update: {
    url: env('UPDATE_URL'),
    platform: process.platform,
  },
  amplitudeApiKey: maybeEnv('AMPLITUDE_API_KEY'),
};
