import { ID } from './id';

export interface Collection {
  id: ID<'collection'>;
  name: string;
  keywords: readonly string[];
}
