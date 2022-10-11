import Store from 'electron-store';
import { ProfileInfo } from '../../../interface/intergration';
import { Crypt } from '../../base/crypt';

export class GmailNativeStore {
  private store: Store<GmailNativeStoreLayout>;

  constructor(name: string, private readonly crypt: Crypt) {
    this.store = new Store<GmailNativeStoreLayout>({
      name,
      migrations: {
        '0.0.1': migrate => {
          migrate.set('profilesById', {});
        },
      },
    });
  }

  setProfile = (profile: Omit<GmailProfile, 'id'>) => {
    const id = this.getProfileId(profile);
    const profilesById = this.store.get('profilesById');
    const record = this.maskProfile({ ...profile, id });
    profilesById[id] = record;
    this.store.set('profilesById', profilesById);
    return record;
  };

  removeProfile = (id: string) => {
    const profilesById = this.store.get('profilesById');
    delete profilesById[id];
    this.store.set('profilesById', profilesById);
  };

  getProfile = (id: string): GmailProfile | undefined => {
    const profilesById = this.store.get('profilesById');
    return this.unmaskProfile(profilesById[id]);
  };

  findProfiles = () => {
    const profilesById = this.store.get('profilesById');
    return Object.values(profilesById).map(this.unmaskProfile);
  };

  asProfileInfo = (profile: GmailProfile): ProfileInfo => {
    return {
      id: this.getProfileId(profile),
      name: profile.email,
    };
  };

  reset = () => {
    this.store.set('profilesById', {});
  };

  private getProfileId = (profile: Pick<GmailProfile, 'email'>) => {
    return profile.email;
  };

  private maskProfile = (profile: GmailProfile): GmailProfile => {
    const accessToken = this.crypt.encrypt(profile.accessToken);
    const refreshToken = this.crypt.encrypt(profile.refreshToken);
    return {
      ...profile,
      accessToken,
      refreshToken,
    };
  };

  private unmaskProfile = (profile: GmailProfile): GmailProfile => {
    const accessToken = this.crypt.decrypt(profile.accessToken);
    const refreshToken = this.crypt.decrypt(profile.refreshToken);
    return {
      ...profile,
      accessToken,
      refreshToken,
    };
  };
}

type GmailNativeStoreLayout = {
  profilesById: { [key: string]: GmailProfile };
};

export type GmailProfile = {
  id: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  email: string;
  name: string;
};
