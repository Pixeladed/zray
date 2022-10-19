import Store from 'electron-store';
import { ProfileInfo } from '../../../interface/intergration';
import { Crypt } from '../../base/crypt';

export class GoogleCalendarNativeStore {
  private store: Store<GoogleCalendarNativeStoreLayout>;

  constructor(name: string, private readonly crypt: Crypt) {
    this.store = new Store<GoogleCalendarNativeStoreLayout>({
      name,
      migrations: {
        '0.0.1': migrate => {
          migrate.set('profilesById', {});
        },
      },
    });
  }

  setProfile = (profile: Omit<GoogleCalendarProfile, 'id'>) => {
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

  getProfile = (id: string): GoogleCalendarProfile | undefined => {
    const profilesById = this.store.get('profilesById');
    return this.unmaskProfile(profilesById[id]);
  };

  findProfiles = () => {
    const profilesById = this.store.get('profilesById');
    return Object.values(profilesById).map(this.unmaskProfile);
  };

  asProfileInfo = (profile: GoogleCalendarProfile): ProfileInfo => {
    return {
      id: this.getProfileId(profile),
      name: profile.email,
    };
  };

  reset = () => {
    this.store.set('profilesById', {});
  };

  private getProfileId = (profile: Pick<GoogleCalendarProfile, 'email'>) => {
    return profile.email;
  };

  private maskProfile = (
    profile: GoogleCalendarProfile
  ): GoogleCalendarProfile => {
    const accessToken = this.crypt.encrypt(profile.accessToken);
    const refreshToken = this.crypt.encrypt(profile.refreshToken);
    return {
      ...profile,
      accessToken,
      refreshToken,
    };
  };

  private unmaskProfile = (
    profile: GoogleCalendarProfile
  ): GoogleCalendarProfile => {
    const accessToken = this.crypt.decrypt(profile.accessToken);
    const refreshToken = this.crypt.decrypt(profile.refreshToken);
    return {
      ...profile,
      accessToken,
      refreshToken,
    };
  };
}

type GoogleCalendarNativeStoreLayout = {
  profilesById: { [key: string]: GoogleCalendarProfile };
};

export type GoogleCalendarProfile = {
  id: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  email: string;
  name: string;
};
