import { MintedPath, Path } from '../../base/path';

export const integrations: IntegrationInfo[] = [
  {
    id: 'com.builtin.slack',
    name: 'Slack',
    icon: Path.resource('/integrations/slack/slack.svg'),
  },
];

export type IntegrationInfo = {
  id: string;
  name: string;
  icon: MintedPath;
};
