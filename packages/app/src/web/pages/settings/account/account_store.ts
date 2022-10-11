import { makeAutoObservable } from 'mobx';

export class AccountStore {
  constructor() {
    makeAutoObservable(this);
  }

  planName: string = 'Unknown';
  integrationLimit: number | null = null;
}
