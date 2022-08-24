import { SearchResult } from './search_native_service';

export class SearchRanker {
  rank = (results: readonly SearchResult[]): readonly SearchResult[] => {
    return results;
  };
}
