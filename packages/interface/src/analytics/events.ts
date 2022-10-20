export type BaseEvent<N extends string, P extends {}> = {
  name: N;
  properties: P;
};
export type EventName<T> = T extends BaseEvent<infer N, any> ? N : never;
export type EventProp<T> = T extends BaseEvent<any, infer P> ? P : never;

export type Event =
  | SearchStartedEvent
  | SearchCompletedEvent
  | SearchResultSeenEvent
  | SearchResultClickedEvent
  | IntegrationAddedEvent
  | IntegrationRemovedEvent;

// event definitions
export type SearchStartedEvent = BaseEvent<
  'search_started',
  { searchId: string; profileCount: number; integrationCount: number }
>;

export type SearchCompletedEvent = BaseEvent<
  'search_completed',
  { searchId: string; resultsCount: number }
>;

export type SearchResultSeenEvent = BaseEvent<
  'search_result_seen',
  { searchId: string; integrationId: string }
>;

export type SearchResultClickedEvent = BaseEvent<
  'search_result_clicked',
  { searchId: string; integrationId: string }
>;

export type IntegrationAddedEvent = BaseEvent<
  'integration_added',
  { integrationId: string }
>;

export type IntegrationRemovedEvent = BaseEvent<
  'integration_removed',
  { integrationId: string }
>;
