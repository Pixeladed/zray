import { exists } from '@highbeam/utils';
import { GlobalSearchEndpoint } from '../../../interface/bridge/endpoints';
import { Handler } from '../../base/bridge_handler';
import { SearchRanker } from './search_ranker';

export class SearchNativeService {
  constructor(
    private readonly providers: readonly SearchProvider[],
    private readonly ranker: SearchRanker
  ) {}

  search: Handler<GlobalSearchEndpoint> = async (event, { query, page }) => {
    const operations = await Promise.allSettled(
      this.providers.map(provider =>
        provider.search(query, { page: page || 0 })
      )
    );
    const providerResults = operations
      .flatMap(op => (op.status === 'fulfilled' ? op.value : undefined))
      .filter(exists);

    const rankedResults = this.ranker.rank(providerResults);
    return { results: rankedResults };
  };
}

export interface SearchProvider {
  search(query: string, options: { page: number }): Promise<SearchResult[]>;
}

export interface SearchResult {
  id: string;
  profileId: string;
  integrationId: string;
  type: string;
  title: string;
  url: string;
  description?: string;
}
