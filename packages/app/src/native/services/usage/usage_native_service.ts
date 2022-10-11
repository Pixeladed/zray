import { Usage } from '@highbeam/interface';
import { ProfileInfo } from '../../../interface/intergration';
import { AuthNativeService } from '../auth/auth_native_service';

export class UsageNativeService {
  constructor(
    private readonly usageClient: Usage.UsageClient,
    private readonly authService: AuthNativeService
  ) {}

  checkAddNewIntegration = async (existingProfiles: readonly ProfileInfo[]) => {
    const plan = await this.getCurrentPlan();
    if (!plan.integrationLimit) {
      return;
    }

    return existingProfiles.length < plan.integrationLimit;
  };

  getCurrentPlan = async () => {
    const token = await this.authService.getToken();
    const res = await this.usageClient.callAuthenticated(
      'getCurrentPlan',
      {},
      token
    );

    return res;
  };
}
