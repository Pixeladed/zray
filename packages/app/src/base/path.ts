import { Distinct } from './ts_utils';

export class Path {
  static resource: PathGenerator = path => {
    return `.${path}` as MintedPath;
  };
}

export type MintedPath = Distinct<string, 'MintedPath'>;
type PathInput = `/${string}`;
export type PathGenerator = (path: PathInput) => MintedPath;

export class Resources {
  static gmailIcon = Path.resource('/integrations/gmail/gmail.svg');
  static gdriveIcon = Path.resource(
    '/integrations/google_drive/google_drive.svg'
  );
  static slackIcon = Path.resource('/integrations/slack/slack.svg');

  static messageIcon = Path.resource('/integrations/common/message.svg');
  static fileIcon = Path.resource('/integrations/common/file.svg');
}
