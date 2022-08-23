import { ConnectIntegrationParam } from '../../../interface/bridge';
import {
  IntegrationInfo,
  IntegrationProfile,
  ProfileInfo,
} from '../../../interface/intergration';
import { Handler } from '../../base/bridge_handler';

export class IntegrationNativeService {
  constructor(
    private readonly integrationInfos: readonly IntegrationInfo[],
    private readonly integrations: readonly NativeIntegration[]
  ) {}

  connect: Handler<ConnectIntegrationParam> = (event, param) => {
    const integration = this.integrations.find(({ id }) => id === param.id);

    if (!integration) {
      throw new Error(`Unsupported integration ${param.id}`);
    }

    return integration.connect();
  };

  list = () => this.integrationInfos;

  listProfiles = () => {
    const profiles: IntegrationProfile[] = [];
    this.integrations.forEach(integration => {
      const integrationProfiles = integration.listProfiles();
      integrationProfiles.forEach(profile => {
        profiles.push({ ...profile, integrationId: integration.id });
      });
    });
    return profiles;
  };
}

export interface NativeIntegration {
  id: string;
  connect(): void;
  listProfiles: () => readonly ProfileInfo[];
}
