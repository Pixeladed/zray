import { AuthLogOutEndpoint } from '../../../../interface/bridge/endpoints';
import { BridgeClient } from '../../../base/bridge_client';

export class AccountController {
  constructor(private readonly bridgeClient: BridgeClient) {}

  logout = () => {
    this.bridgeClient.request<AuthLogOutEndpoint>('auth:logout', {});
    window.close();
  };
}
