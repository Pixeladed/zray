import { makeAutoObservable, action } from 'mobx';
import { GlobalSearchEndpoint } from 'interface/bridge/endpoints';
import { SearchResult } from 'interface/search';
import { BridgeClient } from 'web/base/bridge_client';
import { IntegrationController } from 'web/services/integration/integration_controller';

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
    private readonly bridgeClient: BridgeClient,
    private readonly integrationController: IntegrationController
  ) {}

  init = async () => {
    await Promise.all([
      this.integrationController.loadProfiles(),
      this.integrationController.loadIntegrations(),
    ]);
  };

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
