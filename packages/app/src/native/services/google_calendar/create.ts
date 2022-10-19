import { ClientFactory } from '@highbeam/interface';
import { RefreshTokenUtil } from '../../base/refresh_token_util';
import { Crypt } from '../../base/crypt';
import { GoogleCalendarNativeService } from './google_calendar_native_service';
import { GoogleCalendarNativeStore } from './google_calendar_native_store';

const STORE_NAME = 'google_calendar_native_store';

export const createGoogleCalendarNativeService = ({
  clientFactory,
  redirectOrigin,
  crypt,
}: {
  redirectOrigin: string;
  clientFactory: ClientFactory;
  crypt: Crypt;
}) => {
  const store = new GoogleCalendarNativeStore(STORE_NAME, crypt);
  const googleCalendarClient = clientFactory.for('google_calendar');
  const refreshUtil = new RefreshTokenUtil(refreshToken =>
    googleCalendarClient.call('refreshToken', { refreshToken })
  );
  const googleCalendarNativeService = new GoogleCalendarNativeService(
    redirectOrigin,
    googleCalendarClient,
    store,
    refreshUtil
  );

  return { googleCalendarNativeService };
};
