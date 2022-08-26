import {
  ConnectIntegrationEndpoint,
  ListIntegrationsEndpoint,
  ListProfilesEndpoint,
} from '../../../interface/bridge/endpoints';
import { NewProfileEvent } from '../../../interface/bridge/events';
import {
  IntegrationInfo,
  IntegrationProfile,
  ProfileInfo,
} from '../../../interface/intergration';
import { Broadcaster, Handler } from '../../base/bridge_handler';
import { SearchProvider } from '../search/search_native_service';

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
}

export interface NativeIntegration extends IntegrationInfo, SearchProvider {
  connect(): Promise<IntegrationProfile>;
  listProfiles: () => Promise<readonly ProfileInfo[]>;
}
