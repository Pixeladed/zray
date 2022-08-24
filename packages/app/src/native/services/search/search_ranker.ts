import { SearchResult } from './search_result';

export class SearchRanker {
  rank = (results: readonly SearchResult[]): readonly SearchResult[] => {
    return results;
  };
}
