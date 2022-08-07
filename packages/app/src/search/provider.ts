export interface Provider {
  search(query: string, options: { page: number }): Promise<SearchResult[]>;
  authenticate(): Promise<OperationResult>;
  connect(): Promise<OperationResult>;
}

export type SearchResult = {
  title: string;
  description: string | undefined;
  url: string;
};

export type OperationResult = { success: boolean; cancelled: boolean };

export class UnauthenticatedProviderError extends Error {
  name = 'UnauthenticatedProviderError';
}
