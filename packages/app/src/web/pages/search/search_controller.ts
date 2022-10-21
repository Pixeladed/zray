import {
  SearchCompletedEvent,
  SearchResultClickedEvent,
  SearchResultSeenEvent,
  SearchStartedEvent,
} from '@highbeam/interface';
import { makeAutoObservable, action, runInAction } from 'mobx';
import { nanoid } from 'nanoid';
import {
  AnalyticsTrackEndpoint,
  GlobalSearchEndpoint,
} from '../../../interface/bridge/endpoints';
import { SearchResult } from '../../../interface/search';
import { BridgeClient } from '../../base/bridge_client';
import { IntegrationStore } from '../../services/integration/integration_controller';

export class SearchStore {
  results: readonly SearchResult[] = [];
  loading: boolean = false;
  searchId: string | undefined = undefined;

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
    private readonly integrationStore: IntegrationStore
  ) {}

  search = async (query: string) => {
    if (!query) {
      return;
    }

    const searchId = nanoid();

    runInAction(() => {
      this.store.setResults([]);
      this.store.searchId = searchId;
      this.store.setLoading(true);
    });

    this.bridgeClient.request<AnalyticsTrackEndpoint<SearchStartedEvent>>(
      'analytics:track',
      {
        name: 'search_started',
        properties: {
          integrationCount: this.integrationStore.integrations.length,
          profileCount: this.integrationStore.profiles.length,
          searchId,
        },
      }
    );

    try {
      const res = await this.bridgeClient.request<GlobalSearchEndpoint>(
        'search:global',
        { query }
      );
      this.store.setResults(res.results);
      this.bridgeClient.request<AnalyticsTrackEndpoint<SearchCompletedEvent>>(
        'analytics:track',
        {
          name: 'search_completed',
          properties: {
            resultsCount: res.results.length,
            searchId,
          },
        }
      );
      res.results.forEach(result => this.trackImpression(result));
    } finally {
      this.store.setLoading(false);
    }
  };

  trackImpression = async (item: SearchResult) => {
    this.bridgeClient.request<AnalyticsTrackEndpoint<SearchResultSeenEvent>>(
      'analytics:track',
      {
        name: 'search_result_seen',
        properties: {
          integrationId: item.integrationId,
          searchId: this.store.searchId || '',
        },
      }
    );
  };

  trackClick = async (item: SearchResult) => {
    this.bridgeClient.request<AnalyticsTrackEndpoint<SearchResultClickedEvent>>(
      'analytics:track',
      {
        name: 'search_result_clicked',
        properties: {
          integrationId: item.integrationId,
          searchId: this.store.searchId || '',
        },
      }
    );
  };
}
