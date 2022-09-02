import Store from 'electron-store';
import { ProfileInfo } from '../../../interface/intergration';
import { Safe } from '../../base/safe';

export class GoogleDriveNativeStore {
  private store: Store<GoogleDriveNativeStoreLayout>;

  constructor(name: string, private readonly safe: Safe) {
    this.store = new Store<GoogleDriveNativeStoreLayout>({
      name,
      migrations: {
        '0.0.1': migrate => {
          migrate.set('profilesById', {});
        },
      },
    });
  }

  setProfile = (profile: Omit<GoogleDriveProfile, 'id'>) => {
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

  getProfile = (id: string): GoogleDriveProfile | undefined => {
    const profilesById = this.store.get('profilesById');
    return this.unmaskProfile(profilesById[id]);
  };

  findProfiles = () => {
    const profilesById = this.store.get('profilesById');
    return Object.values(profilesById).map(this.unmaskProfile);
  };

  asProfileInfo = (profile: GoogleDriveProfile): ProfileInfo => {
    return {
      id: this.getProfileId(profile),
      name: profile.email,
    };
  };

  private getProfileId = (profile: Pick<GoogleDriveProfile, 'email'>) => {
    return profile.email;
  };

  private maskProfile = (profile: GoogleDriveProfile): GoogleDriveProfile => {
    const accessToken = this.safe.encrypt(profile.accessToken);
    const refreshToken = this.safe.encrypt(profile.refreshToken);
    return {
      ...profile,
      accessToken,
      refreshToken,
    };
  };

  private unmaskProfile = (profile: GoogleDriveProfile): GoogleDriveProfile => {
    const accessToken = this.safe.decrypt(profile.accessToken);
    const refreshToken = this.safe.decrypt(profile.refreshToken);
    return {
      ...profile,
      accessToken,
      refreshToken,
    };
  };
}

type GoogleDriveNativeStoreLayout = {
  profilesById: { [key: string]: GoogleDriveProfile };
};

export type GoogleDriveProfile = {
  id: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  email: string;
  name: string;
};
