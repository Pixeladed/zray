import { View } from 'native/views/view';

export class SlackOAuthView extends View {
  constructor(url: string) {
    super(
      { type: 'server', url },
      {
        width: 500,
        height: 700,
        title: 'Connecting to Slack',
        webPreferences: {
          contextIsolation: true,
          nodeIntegration: false,
        },
      }
    );
  }
}
