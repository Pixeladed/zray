import { Auth0Config } from '../../base/config';
import { AuthNativeService } from './auth_native_service';

export const createAuthNativeService = (config: Auth0Config) => {
  const authNativeService = new AuthNativeService(config);
  return { authNativeService };
};
