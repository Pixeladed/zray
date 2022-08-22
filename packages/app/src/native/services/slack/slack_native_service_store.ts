import Store from 'electron-store';

export class SlackNativeStore {
  private store = new Store<SlackNativeStoreLayout>({
    migrations: {
      '0.0.1': migrate => {
        migrate.set('profilesById', {});
      },
    },
  });

  setProfile = (profile: SlackProfile) => {
    const id = this.getProfileId(profile);
    const profilesById = this.store.get('profilesById');
    profilesById[id] = profile;
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

export type SlackProfile = {
  userId: string;
  accessToken: string;
  teamName: string;
  teamId: string;
};
