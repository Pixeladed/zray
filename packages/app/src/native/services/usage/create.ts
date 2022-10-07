import { ClientFactory } from '@highbeam/interface';
import { UsageNativeService } from './usage_native_service';

const FREE_PLAN_PROFILE_LIMIT = 3;

export const createUsageNativeService = ({
  clientFactory,
}: {
  clientFactory: ClientFactory;
}) => {
  const usageClient = clientFactory.for('usage');
  const usageNativeService = new UsageNativeService(
    usageClient,
    FREE_PLAN_PROFILE_LIMIT
  );
  return { usageNativeService };
};
