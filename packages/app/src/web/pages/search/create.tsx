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

  const SearchPageImpl = observer(() => {
    return (
      <SearchPage
        onConnectTool={openSettings}
        integrations={integrationStore.integrations}
        profiles={integrationStore.profiles}
      />
    );
  });

  return { SearchPage: SearchPageImpl };
};
