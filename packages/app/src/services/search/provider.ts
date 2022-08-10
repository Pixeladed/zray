import { MintedPath } from '../../base/path';

/**
 * A provider is an instance of an integration that is capable of taking in a query
 * and return a list of search results for said query. e.g. xyz@email.com provider for the Email integration
 */
export abstract class Provider implements ProviderInfo {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly integration: IntegrationInfo
  ) {}

  abstract search(
    query: string,
    options: { page: number }
  ): Promise<SearchResult[]>;
  abstract authenticate(): Promise<OperationResult>;
}

export type ProviderInfo = {
  id: string;
  name: string;
  integration: IntegrationInfo;
};

/**
 * An integration is a type of connector that can be configured to create a new provider
 * an integration itself cannot provide searching capabilities
 */
export abstract class Integration implements IntegrationInfo {
  constructor(readonly name: string, readonly icon: MintedPath) {}

  abstract connect(): Promise<OperationResult<Provider>>;
}

export type IntegrationInfo = {
  name: string;
  icon: MintedPath;
};

export type SearchResult = {
  title: string;
  description: string | undefined;
  url: string;
};

export type OperationResult<T = undefined> =
  | {
      data: T;
      success: true;
    }
  | { success: false; cancelled: boolean };

export class UnauthenticatedProviderError extends Error {
  name = 'UnauthenticatedProviderError';
}
