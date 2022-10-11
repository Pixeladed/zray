import { StripeConfig } from '../../base/config';
import { AuthService } from '../auth/auth_service';
import { UsageService } from './usage_service';

export const createUsageService = ({
  authService,
  config,
}: {
  authService: AuthService;
  config: StripeConfig;
}) => {
  const usageService = new UsageService(
    authService,
    config.apiKey,
    config.defaultPriceId
  );
  return { usageService };
};
