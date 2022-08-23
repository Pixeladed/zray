import Store from 'electron-store';
import { computed, makeAutoObservable } from 'mobx';
import { ProfileInfo } from '../../../interface/intergration';

export class SlackNativeStore {
  private store: Store<SlackNativeStoreLayout>;
  private profilesById = new Map<string, ProfileInfo>();

  profiles = computed<ProfileInfo[]>(() =>
    Array.from(this.profilesById.values())
  );

  constructor(name: string) {
    this.store = new Store<SlackNativeStoreLayout>({
      name,
      migrations: {
        '0.0.1': migrate => {
          migrate.set('profilesById', {});
        },
      },
    });
    makeAutoObservable(this);
    const profilesById = this.store.get('profilesById');
    this.profilesById = new Map(
      Object.entries(profilesById).map(([key, val]) => [
        key,
        this.asProfileInfo(val),
      ])
    );
  }

  setProfile = (profile: SlackProfile) => {
    const id = this.getProfileId(profile);
    const profilesById = this.store.get('profilesById');
    profilesById[id] = profile;
    this.store.set('profilesById', profilesById);
    this.profilesById.set(id, this.asProfileInfo(profile));
  };

  removeProfile = (profile: Pick<SlackProfile, 'teamId' | 'userId'>) => {
    const id = this.getProfileId(profile);
    const profilesById = this.store.get('profilesById');
    delete profilesById[id];
    this.store.set('profilesById', profilesById);
    this.profilesById.delete(id);
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

  private asProfileInfo = (profile: SlackProfile): ProfileInfo => {
    return {
      id: this.getProfileId(profile),
      name: profile.teamId,
    };
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
