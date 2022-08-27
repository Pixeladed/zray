import { Assert } from '@highbeam/utils';
import {
  ConnectIntegrationEndpoint,
  ListIntegrationsEndpoint,
  ListProfilesEndpoint,
  RemoveProfileEndpoint,
} from 'interface/bridge/endpoints';
import { NewProfileEvent, RemovedProfileEvent } from 'interface/bridge/events';
import {
  IntegrationInfo,
  IntegrationProfile,
  ProfileInfo,
} from 'interface/intergration';
import { Broadcaster, Handler } from 'native/base/bridge_handler';
import { SearchProvider } from 'native/services/search/search_native_service';

export class IntegrationNativeService {
  constructor(
    private readonly integrations: readonly NativeIntegration[],
    private readonly broadcast: Broadcaster
  ) {}

  connect: Handler<ConnectIntegrationEndpoint> = async param => {
    const integration = this.integrations.find(({ id }) => id === param.id);

    if (!integration) {
      throw new Error(`Unsupported integration ${param.id}`);
    }

    const profile = await integration.connect();

    this.broadcast<NewProfileEvent>('integration:profile:new', { profile });

    return { profile };
  };

  list: Handler<ListIntegrationsEndpoint> = async () => ({
    integrations: this.integrations.map(integration => ({
      id: integration.id,
      icon: integration.icon,
      name: integration.name,
    })),
  });

  listProfiles: Handler<ListProfilesEndpoint> = async () => {
    const profiles = await Promise.all(
      this.integrations.map(async integration => {
        const integrationProfiles = await integration.listProfiles();
        return integrationProfiles.map(profile => ({
          ...profile,
          integrationId: integration.id,
        }));
      })
    );

    return { profiles: profiles.flat() };
  };

  remove: Handler<RemoveProfileEndpoint> = async param => {
    const { integrationId, profileId } = param;
    const integration = Assert.exists(
      this.integrations.find(integration => integration.id === integrationId),
      'expected integration to exist'
    );
    integration.removeProfile(profileId);
    this.broadcast<RemovedProfileEvent>('integration:profile:removed', {});
    return {};
  };
}

export interface NativeIntegration extends IntegrationInfo, SearchProvider {
  connect(): Promise<IntegrationProfile>;
  listProfiles: () => Promise<readonly ProfileInfo[]>;
  removeProfile: (profileId: string) => Promise<void>;
}
