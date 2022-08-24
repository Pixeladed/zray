import { observer } from 'mobx-react';
import { requestThroughBridge, withBridge } from '../../base/bridge';
import { IntegrationStore } from '../../services/integration/integration_store';
import { SearchPage } from './search';
import { nanoid } from 'nanoid';

export const createSearchPage = ({
  context,
  integrationStore,
}: {
  context: Window;
  integrationStore: IntegrationStore;
}) => {
  const openSettings = withBridge(
    context,
    bridge => () => bridge.invoke('settings:open', {})
  );
  const init = withBridge(
    context,
    bridge => () => bridge.invoke('page:init', {})
  );
  const handleSearch = (query: string) => {
    requestThroughBridge({
      context,
      send: 'search:request',
      receive: 'search:response',
      data: {
        id: nanoid(),
        query,
      },
    });
  };

  const SearchPageImpl = observer(() => {
    return (
      <SearchPage
        onConnectTool={openSettings}
        init={init}
        onSearch={handleSearch}
        results={[]}
        profiles={integrationStore.profiles}
      />
    );
  });

  return { SearchPage: SearchPageImpl };
};
