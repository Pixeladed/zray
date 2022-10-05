import { observer } from 'mobx-react';
import { SearchResult } from '../../../interface/search';
import { BridgeClient } from '../../base/bridge_client';
import { IntegrationStore } from '../../services/integration/integration_controller';
import { NavigationService } from '../../services/navigation/navigation_service';
import { SearchPage } from './search';
import { SearchController, SearchStore } from './search_controller';
import { createSearchResultCard } from './search_result_card/create';

export const createSearchPage = ({
  bridgeClient,
  navigationService,
  integrationStore,
}: {
  bridgeClient: BridgeClient;
  navigationService: NavigationService;
  integrationStore: IntegrationStore;
}) => {
  const store = new SearchStore();
  const controller = new SearchController(store, bridgeClient);

  const openResult = (result: SearchResult) => {
    navigationService.openExternal(result.url);
  };

  const { SearchResultCard } = createSearchResultCard();

  const SearchPageImpl = observer(() => {
    return (
      <SearchPage
        results={store.results}
        loading={store.loading}
        integrationById={integrationStore.integrationsById.get()}
        profiles={integrationStore.profiles}
        onConnectTool={navigationService.openSettings}
        onOpenSettings={navigationService.openSettings}
        openResult={openResult}
        onSearch={controller.search}
        ResultCard={SearchResultCard}
      />
    );
  });

  return { SearchPage: SearchPageImpl };
};
