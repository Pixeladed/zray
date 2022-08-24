import { makeAutoObservable, action } from 'mobx';
import { SearchResult } from '../../../native/services/search/search_native_service';

export class SearchStore {
  results: readonly SearchResult[] = [];

  @action
  setResults = (results: readonly SearchResult[]) => {
    this.results = results;
  };

  constructor() {
    makeAutoObservable(this);
  }
}
