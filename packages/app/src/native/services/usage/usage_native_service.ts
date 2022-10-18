import { Usage } from '@highbeam/interface';
import { GetCurrentPlanEndpoint } from '../../../interface/bridge/endpoints';
import { ProfileInfo } from '../../../interface/intergration';
import { Handler } from '../../base/bridge_handler';
import { AuthNativeService } from '../auth/auth_native_service';

export class UsageNativeService {
  constructor(
    private readonly usageClient: Usage.UsageClient,
    private readonly authService: AuthNativeService
  ) {}

  checkAddNewIntegration = async (existingProfiles: readonly ProfileInfo[]) => {
    const plan = await this.getCurrentPlan({ data: {} });
    if (!plan.integrationLimit) {
      return;
    }

    return existingProfiles.length < plan.integrationLimit;
  };

  getCurrentPlan: Handler<GetCurrentPlanEndpoint> = async () => {
    const token = await this.authService.getToken();
    const res = await this.usageClient.callAuthenticated(
      'getCurrentPlan',
      {},
      token
    );

    return res;
  };
}
