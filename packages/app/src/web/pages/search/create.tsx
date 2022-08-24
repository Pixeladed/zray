import { observer } from 'mobx-react';
import { IntegrationStore } from '../../services/integration/integration_store';
import { SearchPage } from './search';
import { SearchController, SearchStore } from './search_controller';

export const createSearchPage = ({
  context,
  integrationStore,
}: {
  context: Window;
  integrationStore: IntegrationStore;
}) => {
  const store = new SearchStore();
  const controller = new SearchController(store, context);

  const SearchPageImpl = observer(() => {
    return (
      <SearchPage
        results={store.results}
        loading={store.loading}
        profiles={integrationStore.profiles}
        onConnectTool={controller.openSettings}
        init={controller.init}
        onSearch={controller.search}
      />
    );
  });

  return { SearchPage: SearchPageImpl };
};
