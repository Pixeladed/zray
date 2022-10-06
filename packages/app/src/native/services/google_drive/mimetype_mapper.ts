export class MimetypeMapper {
  map = (type: string) => {
    switch (type) {
      case 'application/vnd.google-apps.audio':
        return 'Audio';
      case 'application/vnd.google-apps.document':
        return 'Google Docs';
      case 'application/vnd.google-apps.drive-sdk':
        return 'Shortcut';
      case 'application/vnd.google-apps.drawing':
        return 'Google Drawing';
      case 'application/vnd.google-apps.folder':
        return 'Folder';
      case 'application/vnd.google-apps.form':
        return 'Google Forms';
      case 'application/vnd.google-apps.fusiontable':
        return 'Google Fusion Tables';
      case 'application/vnd.google-apps.jam':
        return 'Google Jamboard';
      case 'application/vnd.google-apps.map':
        return 'Google My Maps';
      case 'application/vnd.google-apps.photo':
        return 'Photo';
      case 'application/vnd.google-apps.presentation':
        return 'Google Slides';
      case 'application/vnd.google-apps.script':
        return 'Google Apps Scripts';
      case 'application/vnd.google-apps.shortcut':
        return 'Shortcut';
      case 'application/vnd.google-apps.site':
        return 'Google Sites';
      case 'application/vnd.google-apps.spreadsheet':
        return 'Google Sheets';
      case 'application/vnd.google-apps.video':
        return 'Video';
      case 'application/pdf':
        return 'PDF';
      case 'image/jpeg':
        return 'JPEG';
      case 'image/png':
        return 'PNG';
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'Microsoft Word Document';
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'Microsoft Excel Spreadsheet';
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return 'Microsoft Powerpoint Presentation';
      default:
        return type;
    }
  };
}
