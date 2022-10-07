import { AuthService } from '../auth/auth_service';
import { UsageService } from './usage_service';

export const createUsageService = ({
  authService,
}: {
  authService: AuthService;
}) => {
  const usageService = new UsageService(authService);
  return { usageService };
};
