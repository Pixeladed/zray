export class Routes {
  static search = () => '/search';
  static settings = () => '/settings';
  static integrations = () => `${Routes.settings()}/integrations`;
  static addIntegration = () => `${Routes.integrations()}/add`;
  static slackIntegrationCallback = () =>
    `${Routes.integrations()}/slack/callback`;

  static href = (source: string, path: string) => {
    const base = source.endsWith('/')
      ? source.substring(0, source.length - 2)
      : source;
    const end = path.startsWith('/') ? path.substring(1) : path;
    return `${base}#/${end}`;
  };
}
