import { Assert } from './assert';
import { Distinct } from './ts_utils';

export class Path {
  static relativeToRoot: PathGenerator = path => {
    Assert.that(path.startsWith('/'));
    return `.${path}` as MintedPath;
  };

  private static resourcesPath = Path.relativeToRoot('/public');

  static resource: PathGenerator = path => {
    Assert.that(path.startsWith('/'));
    return `${Path.resourcesPath}${path}` as MintedPath;
  };
}

export type MintedPath = Distinct<string, 'MintedPath'>;
type PathInput = `/${string}`;
export type PathGenerator = (path: PathInput) => MintedPath;
