import { Broadcaster } from '../../base/bridge_handler';
import { Auth0Config } from '../../base/config';
import { AuthNativeService } from './auth_native_service';

export const createAuthNativeService = (
  config: Auth0Config,
  broadcast: Broadcaster
) => {
  const authNativeService = new AuthNativeService(config, broadcast);
  return { authNativeService };
};
