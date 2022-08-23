import { MintedPath } from '../base/path';

export type IntegrationInfo = {
  id: string;
  name: string;
  icon: MintedPath;
};

export type IntegrationProfile = {
  id: string;
  name: string;
  integrationId: IntegrationInfo['id'];
};
