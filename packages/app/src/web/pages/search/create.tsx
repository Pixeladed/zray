import { withBridge } from '../../base/bridge';
import { SearchPage } from './search';

export const createSearchPage = (context: Window) => {
  const openSettings = withBridge(
    context,
    bridge => () => bridge.invoke('settings:open', {})
  );

  const SearchPageImpl = () => {
    return <SearchPage onConnectTool={openSettings} />;
  };

  return { SearchPage: SearchPageImpl };
};
