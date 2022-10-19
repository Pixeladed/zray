import { systemClock } from '../../../base/clock';
import { Broadcaster } from '../../base/bridge_handler';
import { Auth0Config } from '../../base/config';
import { Crypt } from '../../base/crypt';
import { AuthNativeService } from './auth_native_service';
import { AuthNativeStore } from './auth_native_store';

const STORE_NAME = 'auth_native_store';

export const createAuthNativeService = (
  config: Auth0Config,
  broadcast: Broadcaster,
  crypt: Crypt,
  redirectOrigin: string
) => {
  const redirectUrl = `${redirectOrigin}/login/callback`;
  const store = new AuthNativeStore(STORE_NAME, crypt);
  const authNativeService = new AuthNativeService(
    config,
    broadcast,
    redirectUrl,
    store,
    systemClock
  );
  return { authNativeService };
};
