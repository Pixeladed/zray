import { UsageNativeService } from './usage_native_service';

const FREE_PLAN_PROFILE_LIMIT = 3;

export const createUsageNativeService = () => {
  const usageNativeService = new UsageNativeService(FREE_PLAN_PROFILE_LIMIT);
  return { usageNativeService };
};
