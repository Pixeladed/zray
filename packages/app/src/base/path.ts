import { Distinct } from './ts_utils';

export class Path {
  static resource: PathGenerator = path => {
    return `.${path}` as MintedPath;
  };
}

export type MintedPath = Distinct<string, 'MintedPath'>;
type PathInput = `/${string}`;
export type PathGenerator = (path: PathInput) => MintedPath;
