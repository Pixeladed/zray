import { IntegrationInfo } from '../integrations';
import { makeAutoObservable, action } from 'mobx';

export class IntegrationStore {
  integrations: readonly IntegrationInfo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setIntegrations = (integrations: readonly IntegrationInfo[]) => {
    this.integrations = integrations;
  };
}
