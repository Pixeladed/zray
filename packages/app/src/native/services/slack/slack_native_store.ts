import Store from 'electron-store';
import { ProfileInfo } from '../../../interface/intergration';
import { Safe } from '../../base/safe';

export class SlackNativeStore {
  private store: Store<SlackNativeStoreLayout>;

  constructor(name: string, private readonly safe: Safe) {
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

  getProfile = (id: string): SlackProfile | undefined => {
    const profilesById = this.store.get('profilesById');
    return this.unmaskProfile(profilesById[id]);
  };

  findProfiles = () => {
    const profilesById = this.store.get('profilesById');
    return Object.values(profilesById).map(this.unmaskProfile);
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

  private maskProfile = (profile: SlackProfile): SlackProfile => {
    const accessToken = this.safe.encrypt(profile.accessToken);
    return {
      ...profile,
      accessToken,
    };
  };

  private unmaskProfile = (profile: SlackProfile): SlackProfile => {
    const accessToken = this.safe.decrypt(profile.accessToken);
    return {
      ...profile,
      accessToken,
    };
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
