export type Event<N extends string, P extends {}> = { name: N; properties: P };
export type EventName<T> = T extends Event<infer N, any> ? N : never;
export type EventProp<T> = T extends Event<any, infer P> ? P : never;

// event definitions
