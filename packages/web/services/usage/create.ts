import { UsageService } from './usage_service';

export const createUsageService = () => {
  const usageService = new UsageService();
  return { usageService };
};
