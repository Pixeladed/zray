import { Path } from '../../../../base/path';
import { Integration } from '../integration';

const ICON_PATH = Path.resource('/integrations/slack/slack.svg');

export class SlackIntegration extends Integration {
  constructor(readonly connect: () => void) {
    super('Slack', ICON_PATH);
  }
}

export type SlackIntegrationMessage = {};
