import { makeAutoObservable, runInAction } from 'mobx';
import {
  AuthCheckEndpoint,
  AuthLogInEndpoint,
} from '../../../interface/bridge/endpoints';
import { AuthChangedEvent } from '../../../interface/bridge/events';
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
  ) {
    this.bridgeClient.on<AuthChangedEvent>('auth:changed', () => {
      this.getAuthStatus();
    });
  }

  getAuthStatus = async () => {
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

  login = async () => {
    try {
      await this.bridgeClient.request<AuthLogInEndpoint>('auth:login', {});
      this.getAuthStatus();
    } catch (error) {
      console.log('login failed', error);
    }
  };
}
