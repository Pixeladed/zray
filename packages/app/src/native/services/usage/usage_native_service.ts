import { Usage } from '@highbeam/interface';
import { ProfileInfo } from '../../../interface/intergration';

export class UsageNativeService {
  constructor(
    private readonly usageClient: Usage.UsageClient,
    private readonly freePlanProfileLimit: number
  ) {}

  checkAddNewIntegration = async (existingProfiles: readonly ProfileInfo[]) => {
    const plan = await this.getCurrentPlan();

    switch (plan) {
      case Plan.PRO:
        return true;
      case Plan.FREE:
        return existingProfiles.length < this.freePlanProfileLimit;
      default:
        throw new Error(`Unknown plan ${plan}`);
    }
  };

  getCurrentPlan = async () => {
    const res = await this.usageClient.call('getCurrentPlan', {});
    switch (res.plan) {
      case 'free':
        return Plan.FREE;
      case 'pro':
        return Plan.PRO;
      default:
        throw new Error(`Unknown plan ${res.plan}`);
    }
  };
}

export enum Plan {
  FREE = 1,
  PRO,
}
