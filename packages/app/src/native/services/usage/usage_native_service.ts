import { ProfileInfo } from '../../../interface/intergration';

export class UsageNativeService {
  constructor(private readonly freePlanProfileLimit: number) {}

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
    return Plan.FREE;
  };
}

export enum Plan {
  FREE = 1,
  PRO,
}
