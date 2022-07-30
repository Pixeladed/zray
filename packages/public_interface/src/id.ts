// ARN style id

export type ResourceType = 'emoji' | 'collection';
export type ID<T extends ResourceType> = `${T}:${string}`;
