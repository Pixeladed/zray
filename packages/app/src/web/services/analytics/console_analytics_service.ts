import { Event, EventName, EventProp } from '@highbeam/interface';
import { AnalyticsService } from './analytics_service';

export class ConsoleAnalyticsService implements AnalyticsService {
  track = <T extends Event>(name: EventName<T>, properties: EventProp<T>) => {
    console.groupCollapsed(`[ConsoleAnalytics] track ${name}`);
    console.dir(properties);
    console.groupEnd();
  };
}
