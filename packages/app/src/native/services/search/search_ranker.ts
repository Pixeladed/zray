import { SearchResult } from '../../../interface/search';
import { Sifter } from '@orchidjs/sifter';

export class SearchRanker {
  rank = async (
    query: string,
    results: readonly SearchResult[]
  ): Promise<readonly SearchResult[]> => {
    const index = new Sifter(results, {} as any);
    const fields: (keyof SearchResult)[] = ['title', 'preview'];
    const op = index.search(query, {
      fields,
      filter: false,
    } as any);
    const rankedResults = op.items.map(item => results[item.id as number]);
    return rankedResults;
  };
}
