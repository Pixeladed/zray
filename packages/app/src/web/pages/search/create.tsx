import { getBridge } from '../../../base/bridge';
import { SearchBridge } from '../../../native/views/search/preload';
import { SearchPage } from './search';

const SEARCH_BRIDGE_NAME = 'searchBridge';
const getSearchBridge = (context: Window) =>
  getBridge<SearchBridge>(context, SEARCH_BRIDGE_NAME);

export const createSearchPage = (context: Window) => {
  const openSettings = () => {
    getSearchBridge(context).openSettings();
  };

  const SearchPageImpl = () => {
    return <SearchPage onConnectTool={openSettings} />;
  };

  return { SearchPage: SearchPageImpl };
};
