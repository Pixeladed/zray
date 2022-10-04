import { ResultProps, SearchResultCard } from './search_result_card';

export const createSearchResultCard = () => {
  const SearchResultCardImpl = (props: ResultProps) => (
    <SearchResultCard {...props} />
  );

  return { SearchResultCard: SearchResultCardImpl };
};
