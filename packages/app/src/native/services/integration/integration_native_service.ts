import { ConnectIntegrationParam } from '../../../interface/bridge';
import { IntegrationInfo } from '../../../interface/intergration';
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
}

export interface NativeIntegration extends IntegrationInfo {
  connect(): void;
}
