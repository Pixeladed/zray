import { SearchResult } from '../../../../interface/search';
import { FileResult } from './file_result';
import { MessageResult } from './message_result';
import {
  ResultComponent,
  ResultProps,
  SearchResultCard,
} from './search_result_card';

export const createSearchResultCard = () => {
  const componentMap: { [key in SearchResult['type']]: ResultComponent<any> } =
    {
      file: FileResult,
      message: MessageResult,
    };

  const SearchResultCardImpl = (props: ResultProps) => (
    <SearchResultCard {...props} componentMap={componentMap} />
  );

  return { SearchResultCard: SearchResultCardImpl };
};
