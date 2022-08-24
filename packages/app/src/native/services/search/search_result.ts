export type SearchResult = FileSearchResult | MessageSearchResult;

export type BaseSearchResult = {
  id: string;
  profileId: string;
  integrationId: string;
  url: string;
};

export type FileSearchResult = BaseSearchResult & {
  type: 'file';
  title: string;
  fileType?: string;
};

export type SearchResultUser = {
  name?: string;
  image?: string;
};

export type MessageSearchResult = BaseSearchResult & {
  type: 'message';
  text: string;
  author: SearchResultUser;
  channel: string;
};
