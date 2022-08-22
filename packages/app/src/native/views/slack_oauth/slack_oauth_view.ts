import { View } from '../view';

export class SlackOAuthView extends View {
  constructor(url: string) {
    super(
      { type: 'server', url },
      {
        width: 500,
        height: 700,
      }
    );
  }
}
