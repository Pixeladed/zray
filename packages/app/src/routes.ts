export class Routes {
  static search = () => new Route('/search');

  static settings = () => new Route('/settings');
  static integrations = () => new Route('/integrations', Routes.settings());
  static addIntegration = () => new Route('/add', Routes.integrations());
  static slackOAuthCallback = () =>
    new Route('/slack/callback', Routes.integrations());
  static googleDriveOAuthCallback = () =>
    new Route('/google_drive/callback', Routes.integrations());
  static gmailOAuthCallback = () =>
    new Route('/gmail/callback', Routes.integrations());
}

export class Route {
  constructor(private readonly path: string, private readonly parent?: Route) {}

  get relative() {
    return this.path;
  }

  get absolute(): string {
    return `${this.parent?.absolute || ''}${this.path}`;
  }

  get relativeParent() {
    return `${this.relative}/*`;
  }
}
