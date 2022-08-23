import Store from 'electron-store';
import { IntegrationProfile } from '../../../interface/intergration';

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

  setProfile = (profile: Omit<SlackProfile, 'id' | 'name'>) => {
    const id = this.getProfileId(profile);
    const profilesById = this.store.get('profilesById');
    profilesById[id] = { ...profile, id, name: profile.teamName };
    this.store.set('profilesById', profilesById);
  };

  removeProfile = (profile: Pick<SlackProfile, 'teamId' | 'userId'>) => {
    const id = this.getProfileId(profile);
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

  private getProfileId = (profile: Pick<SlackProfile, 'teamId' | 'userId'>) => {
    return `${profile.userId}@${profile.teamId}`;
  };
}

type SlackNativeStoreLayout = {
  profilesById: { [key: string]: SlackProfile };
};

export type SlackProfile = IntegrationProfile & {
  userId: string;
  accessToken: string;
  teamName: string;
  teamId: string;
};
