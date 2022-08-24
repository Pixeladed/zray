import { makeAutoObservable, action } from 'mobx';
import { nanoid } from 'nanoid';
import { SearchResult } from '../../../native/services/search/search_native_service';
import { requestThroughBridge, withBridge } from '../../base/bridge_client';

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
    private readonly context: Window
  ) {}

  openSettings = withBridge(
    this.context,
    bridge => () => bridge.invoke('settings:open', {})
  );

  init = withBridge(
    this.context,
    bridge => () => bridge.invoke('page:init', {})
  );

  search = async (query: string) => {
    this.store.setLoading(true);
    try {
      const res = await requestThroughBridge({
        context: this.context,
        send: 'search:request',
        receive: 'search:response',
        data: {
          id: nanoid(),
          query,
        },
      });
      this.store.setResults(res.results);
    } finally {
      this.store.setLoading(false);
    }
  };
}
