import { observer } from 'mobx-react';
import { withBridge } from '../../base/bridge';
import { IntegrationStore } from '../../services/integration/integration_store';
import { SearchPage } from './search';

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

  const SearchPageImpl = observer(() => {
    return (
      <SearchPage
        onConnectTool={openSettings}
        init={init}
        integrations={integrationStore.integrations}
        profiles={integrationStore.profiles}
      />
    );
  });

  return { SearchPage: SearchPageImpl };
};
