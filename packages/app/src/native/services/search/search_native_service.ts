import { exists } from '@highbeam/utils';
import { GlobalSearchEndpoint } from '../../../interface/bridge/endpoints';
import { SearchResult } from '../../../interface/search';
import { Handler } from '../../base/bridge_handler';
import { SearchRanker } from './search_ranker';

export class SearchNativeService {
  constructor(
    private readonly providers: readonly SearchProvider[],
    private readonly ranker: SearchRanker
  ) {}

  search: Handler<GlobalSearchEndpoint> = async ({ data: { query, page } }) => {
    const operations = await Promise.allSettled(
      this.providers.map(provider =>
        provider.search(query, { page: page || 0 })
      )
    );

    const failed = operations
      .map(op => (op.status === 'rejected' ? op.reason : undefined))
      .filter(exists);
    if (failed.length) {
      console.debug('failed search tasks', failed);
    }

    const providerResults = operations
      .flatMap(op => (op.status === 'fulfilled' ? op.value : undefined))
      .filter(exists);

    const rankedResults = await this.ranker.rank(query, providerResults);
    return { results: rankedResults };
  };
}

export interface SearchProvider {
  search(query: string, options: { page: number }): Promise<SearchResult[]>;
}
