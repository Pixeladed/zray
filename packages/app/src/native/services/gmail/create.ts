import { ClientFactory } from '@highbeam/interface';
import { RefreshTokenUtil } from '../../base/refresh_token_util';
import { Safe } from '../../base/safe';
import { GmailNativeService } from './gmail_native_service';
import { GmailNativeStore } from './gmail_native_store';

const STORE_NAME = 'gmail_native_store';

export const createGmailNativeService = ({
  clientFactory,
  redirectOrigin,
  safe,
}: {
  redirectOrigin: string;
  clientFactory: ClientFactory;
  safe: Safe;
}) => {
  const store = new GmailNativeStore(STORE_NAME, safe);
  const gmailClient = clientFactory.for('gmail');
  const refreshUtil = new RefreshTokenUtil(refreshToken =>
    gmailClient.call('refreshToken', { refreshToken })
  );
  const gmailNativeService = new GmailNativeService(
    redirectOrigin,
    gmailClient,
    store,
    refreshUtil
  );

  return { gmailNativeService };
};
