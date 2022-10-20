export type Event<N extends string, P extends {}> = { name: N; properties: P };
export type EventName<T> = T extends Event<infer N, any> ? N : never;
export type EventProp<T> = T extends Event<any, infer P> ? P : never;

// event definitions
export type SearchStartedEvent = Event<
  'search_started',
  { searchId: string; profileCount: number; integrationCount: number }
>;

export type SearchCompletedEvent = Event<
  'search_completed',
  { searchId: string; resultsCount: number }
>;

export type SearchResultSeen = Event<
  'search_result_seen',
  { searchId: string; integrationId: string }
>;

export type SearchResultClickedEvent = Event<
  'search_result_clicked',
  { searchId: string; integrationId: string }
>;

export type IntegrationAddedEvent = Event<
  'integration_added',
  { integrationId: string }
>;

export type IntegrationRemovedEvent = Event<
  'integration_removed',
  { integrationId: string }
>;
