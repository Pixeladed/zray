export class Routes {
  static search = () => '/search';

  static href = (source: string, path: string) => {
    const base = source.endsWith('/')
      ? source.substring(0, source.length - 2)
      : source;
    const end = path.startsWith('/') ? path.substring(1) : path;
    return `${base}#/${end}`;
  };
}
