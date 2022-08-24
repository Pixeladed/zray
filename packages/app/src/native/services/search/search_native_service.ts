import { exists } from '@highbeam/utils';
import { SearchRequestParam } from '../../../interface/bridge/endpoints';
import { Handler } from '../../base/bridge_handler';
import { SearchRanker } from './search_ranker';

export class SearchNativeService {
  constructor(
    private readonly providers: readonly SearchProvider[],
    private readonly ranker: SearchRanker
  ) {}

  search = async (query: string, page?: number) => {
    const operations = await Promise.allSettled(
      this.providers.map(provider =>
        provider.search(query, { page: page || 0 })
      )
    );
    const providerResults = operations
      .flatMap(op => (op.status === 'fulfilled' ? op.value : undefined))
      .filter(exists);

    const rankedResults = this.ranker.rank(providerResults);
    console.log('ranked results', rankedResults);

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
