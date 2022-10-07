import { Config } from '../../base/config';
import { AuthService } from './auth_service';

export const createAuthService = (config: Config['auth0']) => {
  const authService = new AuthService(config.domain, config.audience);
  return { authService };
};
