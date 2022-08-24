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
        onConnectTool={controller.openSettings}
        init={controller.init}
        onSearch={controller.search}
        results={store.results}
        profiles={integrationStore.profiles}
      />
    );
  });

  return { SearchPage: SearchPageImpl };
};
