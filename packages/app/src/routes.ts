export class Routes {
  static search = () => new Route('/search');

  static settings = () => new Route('/settings');
  static integrations = () => new Route('/integrations', Routes.settings());
  static addIntegration = () => new Route('/add', Routes.integrations());
  static slackIntegrationCallback = () =>
    new Route('/slack/callback', Routes.integrations());
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
