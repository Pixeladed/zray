import { MintedPath, Path } from '../../base/path';
import { IntegrationName } from '../../interface/bridge';

export const integrations: IntegrationInfo[] = [
  { name: 'slack', icon: Path.resource('/integrations/slack/slack.svg') },
];

export type IntegrationInfo = {
  name: IntegrationName;
  icon: MintedPath;
};
