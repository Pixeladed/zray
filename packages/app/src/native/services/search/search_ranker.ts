import { SearchResult } from '../../../interface/search';
import Flexsearch from 'flexsearch';

export class SearchRanker {
  rank = (
    query: string,
    results: readonly SearchResult[]
  ): Promise<readonly SearchResult[]> => {
    const index = Flexsearch.create<SearchResult>();
    results.forEach(result => index.add(result));
    return index.search(query);
  };
}
