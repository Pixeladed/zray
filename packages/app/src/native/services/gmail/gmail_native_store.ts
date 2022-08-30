import Store from 'electron-store';
import { ProfileInfo } from '../../../interface/intergration';

export class GmailNativeStore {
  private store: Store<GmailNativeStoreLayout>;

  constructor(name: string) {
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
    const record = { ...profile, id };
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
    return profilesById[id];
  };

  findProfiles = () => {
    const profilesById = this.store.get('profilesById');
    return Object.values(profilesById);
  };

  asProfileInfo = (profile: GmailProfile): ProfileInfo => {
    return {
      id: this.getProfileId(profile),
      name: profile.email,
    };
  };

  private getProfileId = (profile: Pick<GmailProfile, 'email'>) => {
    return profile.email;
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
