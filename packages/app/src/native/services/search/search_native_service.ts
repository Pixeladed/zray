import { ProfileInfo } from '../../../interface/intergration';

export class SearchNativeService {}

export interface SearchProvider {
  search(
    profile: ProfileInfo,
    query: string,
    options: { page: number }
  ): Promise<SearchResult[]>;
}

export interface SearchResult {
  id: string;
  profileId: string;
  integrationId: string;
  title: string;
  url: string;
  description?: string;
}
