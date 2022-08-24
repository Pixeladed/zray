import { observer } from 'mobx-react';
import { requestThroughBridge, withBridge } from '../../base/bridge';
import { IntegrationStore } from '../../services/integration/integration_store';
import { SearchPage } from './search';
import { nanoid } from 'nanoid';
import { SearchStore } from './search_store';

export const createSearchPage = ({
  context,
  integrationStore,
}: {
  context: Window;
  integrationStore: IntegrationStore;
}) => {
  const store = new SearchStore();
  const openSettings = withBridge(
    context,
    bridge => () => bridge.invoke('settings:open', {})
  );
  const init = withBridge(
    context,
    bridge => () => bridge.invoke('page:init', {})
  );

  const handleSearch = async (query: string) => {
    const res = await requestThroughBridge({
      context,
      send: 'search:request',
      receive: 'search:response',
      data: {
        id: nanoid(),
        query,
      },
    });
    store.setResults(res.results);
  };

  const SearchPageImpl = observer(() => {
    return (
      <SearchPage
        onConnectTool={openSettings}
        init={init}
        onSearch={handleSearch}
        results={store.results}
        profiles={integrationStore.profiles}
      />
    );
  });

  return { SearchPage: SearchPageImpl };
};
