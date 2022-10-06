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
  static GMAIL_ICON = Path.resource('/integrations/gmail/gmail.svg');
  static GDRIVE_ICON = Path.resource(
    '/integrations/google_drive/google_drive.svg'
  );
  static SLACK_ICON = Path.resource('/integrations/slack/slack.svg');

  static MESSAGE_ICON = Path.resource('/integrations/common/message.svg');
  static FILE_ICON = Path.resource('/integrations/common/file.svg');
  static FOLDER_ICON = Path.resource('/integrations/common/folder.svg');
  static EMAIL_ICON = Path.resource('/integrations/common/email.svg');
}
