import { systemClock } from '../../../base/clock';
import { Broadcaster } from '../../base/bridge_handler';
import { Auth0Config } from '../../base/config';
import { Crypt } from '../../base/crypt';
import { AnalyticsNativeService } from '../analytics/analytics_native_service';
import { AuthNativeService } from './auth_native_service';
import { AuthNativeStore } from './auth_native_store';

const STORE_NAME = 'auth_native_store';

export const createAuthNativeService = (
  config: Auth0Config,
  broadcast: Broadcaster,
  crypt: Crypt,
  redirectOrigin: string,
  analyticsService: AnalyticsNativeService
) => {
  const redirectUrl = `${redirectOrigin}/login/callback`;
  const store = new AuthNativeStore(STORE_NAME, crypt);
  const authNativeService = new AuthNativeService(
    config,
    broadcast,
    redirectUrl,
    store,
    systemClock,
    analyticsService
  );
  return { authNativeService };
};
