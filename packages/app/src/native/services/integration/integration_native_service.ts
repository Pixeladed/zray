import { ConnectIntegrationParam } from '../../../interface/bridge';
import { Handler } from '../../base/bridge_handler';

export class IntegrationNativeService {
  constructor(private readonly integrations: readonly NativeIntegration[]) {}

  connect: Handler<ConnectIntegrationParam> = (event, param) => {
    const integration = this.integrations.find(({ id }) => id === param.id);

    if (!integration) {
      throw new Error(`Unsupported integration ${param.id}`);
    }

    return integration.connect();
  };
}

export interface NativeIntegration {
  id: string;
  connect(): void;
}
