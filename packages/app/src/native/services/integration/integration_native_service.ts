import { Assert } from '@highbeam/utils';
import { Dialog } from 'electron';
import {
  ConnectIntegrationEndpoint,
  ListIntegrationsEndpoint,
  ListProfilesEndpoint,
  RemoveProfileEndpoint,
  ResetIntegrationsEndpoint,
} from '../../../interface/bridge/endpoints';
import {
  NewProfileEvent,
  RemovedProfileEvent,
} from '../../../interface/bridge/events';
import {
  IntegrationInfo,
  IntegrationProfile,
  ProfileInfo,
} from '../../../interface/intergration';
import { Broadcaster, Handler } from '../../base/bridge_handler';
import { SearchProvider } from '../search/search_native_service';
import { UsageNativeService } from '../usage/usage_native_service';

export class IntegrationNativeService {
  constructor(
    private readonly integrations: readonly NativeIntegration[],
    private readonly broadcast: Broadcaster,
    private readonly usageService: UsageNativeService,
    private readonly dialog: Dialog
  ) {}

  connect: Handler<ConnectIntegrationEndpoint> = async ({ data: param }) => {
    const existingProfiles = await this.listProfiles({ data: {} });
    const canConnect = await this.usageService.checkAddNewIntegration(
      existingProfiles.profiles
    );

    if (!canConnect) {
      this.dialog.showErrorBox(
        'You have reached the integration limit for the current plan',
        'Upgrade to Pro to connect more integrations!'
      );
      return {};
    }

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

  remove: Handler<RemoveProfileEndpoint> = async ({ data: param }) => {
    const { integrationId, profileId } = param;
    const integration = Assert.exists(
      this.integrations.find(integration => integration.id === integrationId),
      'expected integration to exist'
    );
    integration.removeProfile(profileId);
    this.broadcast<RemovedProfileEvent>('integration:profile:removed', {});
    return {};
  };

  reset: Handler<ResetIntegrationsEndpoint> = async () => {
    const ops = this.integrations.map(integration => integration.reset());
    return await Promise.all(ops);
  };
}

export interface NativeIntegration extends IntegrationInfo, SearchProvider {
  connect(): Promise<IntegrationProfile>;
  listProfiles: () => Promise<readonly ProfileInfo[]>;
  removeProfile: (profileId: string) => Promise<void>;
  reset: () => Promise<void>;
}
