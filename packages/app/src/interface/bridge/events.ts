import { ProfileInfo } from '../intergration';

export type Event<N extends string, D> = {
  name: N;
  data?: D;
};
export type EventName<T> = T extends Event<infer N, any> ? N : never;
export type EventData<T> = T extends Event<any, infer D> ? D : never;

export type Events = NewProfileEvent | RemovedProfileEvent;

export type NewProfileEvent = Event<
  'integration:profile:new',
  { profile: ProfileInfo }
>;

export type RemovedProfileEvent = Event<'integration:profile:removed', {}>;
