import {
  IntegrationAddedEvent,
  IntegrationRemovedEvent,
} from '@highbeam/interface';
import { Assert } from '@highbeam/utils';
import { computed, makeAutoObservable, runInAction } from 'mobx';
import {
  AnalyticsTrackEndpoint,
  ConnectIntegrationEndpoint,
  GetCurrentPlanEndpoint,
  ListIntegrationsEndpoint,
  ListProfilesEndpoint,
  RemoveProfileEndpoint,
} from '../../../interface/bridge/endpoints';
import {
  NewProfileEvent,
  RemovedProfileEvent,
} from '../../../interface/bridge/events';
import {
  IntegrationInfo,
  IntegrationProfile,
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

  integrationsById = computed(() => {
    return new Map<string, IntegrationInfo>(
      this.integrations.map(integration => [integration.id, integration])
    );
  });

  integrationLimit: number | null = 0;

  constructor() {
    makeAutoObservable(this);
  }
}

export class IntegrationController {
  constructor(
    private readonly store: IntegrationStore,
    private readonly bridgeClient: BridgeClient
  ) {
    this.bridgeClient.on<NewProfileEvent>('integration:profile:new', () => {
      this.loadProfiles();
    });
    this.bridgeClient.on<RemovedProfileEvent>(
      'integration:profile:removed',
      () => {
        this.loadProfiles();
      }
    );
  }

  init = () => {
    return Promise.all([
      this.loadIntegrations(),
      this.loadProfiles(),
      this.loadIntegrationLimit(),
    ]);
  };

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
    await this.bridgeClient.request<ConnectIntegrationEndpoint>(
      'integration:connect',
      { id }
    );
    this.bridgeClient.request<AnalyticsTrackEndpoint<IntegrationAddedEvent>>(
      'analytics:track',
      {
        name: 'integration_added',
        properties: { integrationId: id },
      }
    );
  };

  remove = async (profile: IntegrationProfile) => {
    await this.bridgeClient.request<RemoveProfileEndpoint>(
      'integration:profiles:remove',
      { integrationId: profile.integrationId, profileId: profile.id }
    );
    this.bridgeClient.request<AnalyticsTrackEndpoint<IntegrationRemovedEvent>>(
      'analytics:track',
      {
        name: 'integration_removed',
        properties: { integrationId: profile.integrationId },
      }
    );
  };

  loadIntegrationLimit = async () => {
    const res = await this.bridgeClient.request<GetCurrentPlanEndpoint>(
      'usage:getCurrentPlan',
      {}
    );
    runInAction(() => (this.store.integrationLimit = res.integrationLimit));
  };
}

export type ProfileWithIntegration = IntegrationProfile & {
  integration: IntegrationInfo;
};
