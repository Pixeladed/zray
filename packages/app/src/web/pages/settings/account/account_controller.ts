import { AuthLogOutEndpoint } from '../../../../interface/bridge/endpoints';
import { BridgeClient } from '../../../base/bridge_client';
import { NavigationService } from '../../../services/navigation/navigation_service';

export class AccountController {
  constructor(
    private readonly bridgeClient: BridgeClient,
    private readonly navigationService: NavigationService,
    private readonly billingPortalUrl: string
  ) {}

  logout = () => {
    this.bridgeClient.request<AuthLogOutEndpoint>('auth:logout', {});
    window.close();
  };

  openBillingPortal = () => {
    this.navigationService.openExternal(this.billingPortalUrl);
  };
}
