import { computed, IComputedValue, makeAutoObservable } from 'mobx';
import { ConnectIntegrationParam } from '../../../interface/bridge';
import { IntegrationInfo, ProfileInfo } from '../../../interface/intergration';
import { Handler } from '../../base/bridge_handler';

export class IntegrationNativeService {
  constructor(
    private readonly integrationInfos: readonly IntegrationInfo[],
    private readonly integrations: readonly NativeIntegration[]
  ) {
    makeAutoObservable(this);
  }

  connect: Handler<ConnectIntegrationParam> = (event, param) => {
    const integration = this.integrations.find(({ id }) => id === param.id);

    if (!integration) {
      throw new Error(`Unsupported integration ${param.id}`);
    }

    return integration.connect();
  };

  list = (): IntegrationInfo[] => {
    return this.integrationInfos.map(info => ({ ...info }));
  };

  profiles = computed(() =>
    this.integrations.flatMap(integration => {
      return integration.profiles.get().map(profile => ({
        ...profile,
        integrationId: integration.id,
      }));
    })
  );
}

export interface NativeIntegration {
  id: string;
  connect(): void;
  profiles: IComputedValue<readonly ProfileInfo[]>;
}
