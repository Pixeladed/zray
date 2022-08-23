import { makeAutoObservable, action } from 'mobx';
import {
  IntegrationInfo,
  IntegrationProfile,
} from '../../../interface/intergration';

export class IntegrationStore {
  integrations: readonly IntegrationInfo[] = [];

  profiles: readonly IntegrationProfile[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setIntegrations = (integrations: readonly IntegrationInfo[]) => {
    this.integrations = integrations;
  };

  @action
  setProfiles = (profiles: readonly IntegrationProfile[]) => {
    this.profiles = profiles;
  };
}
