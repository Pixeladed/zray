import { ClientFactory } from '@highbeam/interface';
import { AnalyticsNativeService } from '../analytics/analytics_native_service';
import { AuthNativeService } from '../auth/auth_native_service';
import { UsageNativeService } from './usage_native_service';

export const createUsageNativeService = ({
  clientFactory,
  authNativeService,
  analyticsService,
}: {
  clientFactory: ClientFactory;
  authNativeService: AuthNativeService;
  analyticsService: AnalyticsNativeService;
}) => {
  const usageClient = clientFactory.for('usage');
  const usageNativeService = new UsageNativeService(
    usageClient,
    authNativeService,
    analyticsService
  );
  return { usageNativeService };
};
