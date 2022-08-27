import { SearchResult } from 'interface/search';

export class SearchRanker {
  rank = (results: readonly SearchResult[]): readonly SearchResult[] => {
    return results;
  };
}
