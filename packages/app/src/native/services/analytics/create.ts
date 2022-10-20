import { ConsoleAnalyticsService } from './console_analytics_service';

export const createAnalyticsNativeService = () => {
  const analyticsNativeService = new ConsoleAnalyticsService();
  return { analyticsNativeService };
};
