import Store from 'electron-store';
import { Crypt } from '../../base/crypt';

export class AuthNativeStore {
  private store: Store<StoreLayout>;

  constructor(name: string, private readonly crypt: Crypt) {
    this.store = new Store<StoreLayout>({
      name,
      migrations: {
        '0.1.0': store => {
          store.set('refreshToken', undefined);
          store.set('accessToken', undefined);
          store.set('accessTokenExpiresAt', undefined);
        },
      },
    });
  }

  getRefreshToken = () => {
    const encryptedToken = this.store.get('refreshToken');

    if (!encryptedToken) {
      return undefined;
    }

    return this.crypt.decrypt(encryptedToken);
  };

  setRefreshToken = (refreshToken: string) => {
    const encryptedToken = this.crypt.encrypt(refreshToken);
    this.store.set('refreshToken', encryptedToken);
  };

  getAccessToken = () => {
    const encryptedToken = this.store.get('accessToken');
    const expiresAt = this.store.get('accessTokenExpiresAt');
    const accessToken = encryptedToken
      ? this.crypt.decrypt(encryptedToken)
      : undefined;
    return { accessToken, expiresAt };
  };

  setAccessToken = (accessToken: string, expirationDate: number) => {
    const encryptedToken = this.crypt.encrypt(accessToken);
    this.store.set('accessToken', encryptedToken);
    this.store.set('accessTokenExpiresAt', expirationDate);
  };

  clear = () => {
    this.store.set('accessToken', undefined);
    this.store.set('accessTokenExpiresAt', undefined);
    this.store.set('refreshToken', undefined);
  };
}

type StoreLayout = {
  refreshToken: string | undefined;
  accessToken: string | undefined;
  accessTokenExpiresAt: number | undefined;
};
