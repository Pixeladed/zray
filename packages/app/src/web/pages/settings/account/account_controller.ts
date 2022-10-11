import { runInAction } from 'mobx';
import {
  AuthLogOutEndpoint,
  GetCurrentPlanEndpoint,
} from '../../../../interface/bridge/endpoints';
import { BridgeClient } from '../../../base/bridge_client';
import { NavigationService } from '../../../services/navigation/navigation_service';
import { AccountStore } from './account_store';

export class AccountController {
  constructor(
    private readonly accountStore: AccountStore,
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

  loadUsage = async () => {
    const res = await this.bridgeClient.request<GetCurrentPlanEndpoint>(
      'usage:getCurrentPlan',
      {}
    );
    runInAction(() => {
      this.accountStore.integrationLimit = res.integrationLimit;
      this.accountStore.planName = res.name;
    });
  };
}
