import { Event, EventName, EventProp } from '@highbeam/interface';

export interface AnalyticsService {
  track<T extends Event>(name: EventName<T>, properties: EventProp<T>): void;
}
