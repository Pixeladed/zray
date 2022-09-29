import { makeAutoObservable, runInAction } from 'mobx';
import {
  AuthCheckEndpoint,
  AuthLogInEndpoint,
} from '../../../interface/bridge/endpoints';
import { BridgeClient } from '../../base/bridge_client';

export class AuthGateStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoggedIn: boolean = false;
  isLoading: boolean = true;
}

export class AuthGateController {
  constructor(
    private readonly store: AuthGateStore,
    private readonly bridgeClient: BridgeClient
  ) {}

  init = async () => {
    runInAction(() => {
      this.store.isLoading = true;
    });
    try {
      const res = await this.bridgeClient.request<AuthCheckEndpoint>(
        'auth:check',
        {}
      );
      runInAction(() => {
        this.store.isLoggedIn = res.authenticated;
        this.store.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.store.isLoading = false;
      });
    }
  };

  login = () => {
    return this.bridgeClient.request<AuthLogInEndpoint>('auth:login', {});
  };
}
