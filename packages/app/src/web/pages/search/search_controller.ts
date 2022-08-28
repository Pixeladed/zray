import { makeAutoObservable, action } from 'mobx';
import { GlobalSearchEndpoint } from '../../../interface/bridge/endpoints';
import { SearchResult } from '../../../interface/search';
import { BridgeClient } from '../../base/bridge_client';

export class SearchStore {
  results: readonly SearchResult[] = [];
  loading: boolean = false;

  @action
  setResults = (results: readonly SearchResult[]) => {
    this.results = results;
  };

  @action
  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export class SearchController {
  constructor(
    private readonly store: SearchStore,
    private readonly bridgeClient: BridgeClient
  ) {}

  search = async (query: string) => {
    this.store.setLoading(true);
    try {
      const res = await this.bridgeClient.request<GlobalSearchEndpoint>(
        'search:global',
        { query }
      );
      this.store.setResults(res.results);
    } finally {
      this.store.setLoading(false);
    }
  };
}
