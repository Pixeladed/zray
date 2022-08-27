import { Assert } from '@highbeam/utils';
import { computed, makeAutoObservable, runInAction } from 'mobx';
import {
  ConnectIntegrationEndpoint,
  ListIntegrationsEndpoint,
  ListProfilesEndpoint,
} from '../../../interface/bridge/endpoints';
import {
  IntegrationInfo,
  IntegrationProfile,
  ProfileInfo,
} from '../../../interface/intergration';
import { BridgeClient } from '../../base/bridge_client';

export class IntegrationStore {
  integrations: readonly IntegrationInfo[] = [];
  profiles: readonly IntegrationProfile[] = [];

  profilesWithIntegration = computed(() => {
    const result: ProfileWithIntegration[] = this.profiles.map(profile => {
      const integration = Assert.exists(
        this.integrations.find(
          integration => integration.id === profile.integrationId
        ),
        'expected integration to exist for profile'
      );
      return { ...profile, integration };
    });

    return result;
  });

  constructor() {
    makeAutoObservable(this);
  }
}

export class IntegrationController {
  constructor(
    private readonly store: IntegrationStore,
    private readonly bridgeClient: BridgeClient
  ) {}

  loadIntegrations = async () => {
    const res = await this.bridgeClient.request<ListIntegrationsEndpoint>(
      'integration:list',
      {}
    );

    runInAction(() => {
      this.store.integrations = res.integrations;
    });
  };

  loadProfiles = async () => {
    const res = await this.bridgeClient.request<ListProfilesEndpoint>(
      'integration:profiles:list',
      {}
    );

    runInAction(() => {
      this.store.profiles = res.profiles;
    });
  };

  connect = async (id: string) => {
    return await this.bridgeClient.request<ConnectIntegrationEndpoint>(
      'integration:connect',
      { id }
    );
  };
}

export type ProfileWithIntegration = ProfileInfo & {
  integration: IntegrationInfo;
};
