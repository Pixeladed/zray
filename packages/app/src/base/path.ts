import { Assert } from './assert';
import { Distinct } from './ts_utils';

export class Path {
  static resource: PathGenerator = path => {
    Assert.that(path.startsWith('/'));
    return `${path}` as MintedPath;
  };
}

export type MintedPath = Distinct<string, 'MintedPath'>;
type PathInput = `/${string}`;
export type PathGenerator = (path: PathInput) => MintedPath;
