import { SearchNativeService, SearchProvider } from './search_native_service';
import { SearchRanker } from './search_ranker';

export const createSearchNativeService = ({
  providers,
}: {
  providers: readonly SearchProvider[];
}) => {
  const ranker = new SearchRanker();
  const searchNativeService = new SearchNativeService(providers, ranker);

  return { searchNativeService };
};
