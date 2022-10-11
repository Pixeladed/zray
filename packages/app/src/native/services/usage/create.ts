import { ClientFactory } from '@highbeam/interface';
import { AuthNativeService } from '../auth/auth_native_service';
import { UsageNativeService } from './usage_native_service';

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
    authNativeService
  );
  return { usageNativeService };
};
