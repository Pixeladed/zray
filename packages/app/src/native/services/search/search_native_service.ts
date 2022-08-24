import { exists } from '@highbeam/utils';
import { SearchRanker } from './search_ranker';

export class SearchNativeService {
  constructor(
    private readonly providers: readonly SearchProvider[],
    private readonly ranker: SearchRanker
  ) {}

  search = async (query: string, options?: { page?: number }) => {
    const operations = await Promise.allSettled(
      this.providers.map(provider =>
        provider.search(query, { page: options?.page || 0 })
      )
    );
    const providerResults = operations
      .flatMap(op => (op.status === 'fulfilled' ? op.value : undefined))
      .filter(exists);

    const rankedResults = this.ranker.rank(providerResults);

    return rankedResults;
  };
}

export interface SearchProvider {
  search(query: string, options: { page: number }): Promise<SearchResult[]>;
}

export interface SearchResult {
  id: string;
  profileId: string;
  integrationId: string;
  title: string;
  url: string;
  description?: string;
}
