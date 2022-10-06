import { ProfileInfo } from '../../../interface/intergration';

export class UsageNativeService {
  constructor(private readonly freePlanProfileLimit: number) {}

  checkAddNewIntegration = (
    plan: Plan,
    existingProfiles: readonly ProfileInfo[]
  ) => {
    switch (plan) {
      case Plan.PRO:
        return true;
      case Plan.FREE:
        return existingProfiles.length < this.freePlanProfileLimit;
      default:
        throw new Error(`Unknown plan ${plan}`);
    }
  };
}

export enum Plan {
  FREE = 1,
  PRO,
}
