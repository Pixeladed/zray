import { View } from '../view';

export class SlackOAuthView extends View {
  constructor(url: string) {
    super(
      { type: 'server', url },
      {
        width: 300,
        height: 400,
      }
    );
  }
}
