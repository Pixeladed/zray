import { ClientFactory } from '@highbeam/interface';
import { AuthNativeService } from '../auth/auth_native_service';
import { UsageNativeService } from './usage_native_service';

const FREE_PLAN_PROFILE_LIMIT = 3;

export const createUsageNativeService = ({
  clientFactory,
  authNativeService,
}: {
  clientFactory: ClientFactory;
  authNativeService: AuthNativeService;
}) => {
  const usageClient = clientFactory.for('usage');
  const usageNativeService = new UsageNativeService(
    usageClient,
    authNativeService,
    FREE_PLAN_PROFILE_LIMIT
  );
  return { usageNativeService };
};
