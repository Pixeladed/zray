import Store from 'electron-store';
import { ProfileInfo } from '../../../interface/intergration';

export class SlackNativeStore {
  private store: Store<SlackNativeStoreLayout>;

  constructor(name: string) {
    this.store = new Store<SlackNativeStoreLayout>({
      name,
      migrations: {
        '0.0.1': migrate => {
          migrate.set('profilesById', {});
        },
      },
    });
  }

  setProfile = (profile: Omit<SlackProfile, 'id'>) => {
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

  getProfile = (id: string): SlackProfile | undefined => {
    const profilesById = this.store.get('profilesById');
    return profilesById[id];
  };

  findProfiles = () => {
    const profilesById = this.store.get('profilesById');
    return Object.values(profilesById);
  };

  asProfileInfo = (profile: SlackProfile): ProfileInfo => {
    return {
      id: profile.id,
      name: profile.teamName,
    };
  };

  private getProfileId = (profile: Pick<SlackProfile, 'teamId' | 'userId'>) => {
    return `${profile.userId}@${profile.teamId}`;
  };
}

type SlackNativeStoreLayout = {
  profilesById: { [key: string]: SlackProfile };
};

export type SlackProfile = {
  id: string;
  userId: string;
  accessToken: string;
  teamName: string;
  teamId: string;
};