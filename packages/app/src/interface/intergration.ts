import { MintedPath } from 'base/path';

export type IntegrationInfo = {
  id: string;
  name: string;
  icon: MintedPath;
};

export type IntegrationProfile = ProfileInfo & {
  integrationId: string;
};

export type ProfileInfo = {
  id: string;
  name: string;
};
