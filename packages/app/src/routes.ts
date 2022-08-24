export class Routes {
  static search = () => '/search';
  static settings = () => '/settings';
  static integrations = () => `${Routes.settings()}/integrations`;
  static addIntegration = () => `${Routes.integrations()}/add`;
  static slackIntegrationCallback = () =>
    `${Routes.integrations()}/slack/callback`;

  static href = (source: string, path: string) => {
    const url = new URL(source);
    return `${url.origin}#${path}`;
  };
}
