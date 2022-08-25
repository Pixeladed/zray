import { observer } from 'mobx-react';
import { SearchResult } from '../../../interface/search';
import { BridgeClient } from '../../base/bridge_client';
import { createIntegrationService } from '../../services/integration/create';
import { NavigationService } from '../../services/navigation/navigation_service';
import { SearchPage } from './search';
import { SearchController, SearchStore } from './search_controller';

export const createSearchPage = ({
  bridgeClient,
  navigationService,
}: {
  bridgeClient: BridgeClient;
  navigationService: NavigationService;
}) => {
  const { integrationStore, integrationController } = createIntegrationService({
    bridgeClient,
  });

  const store = new SearchStore();
  const controller = new SearchController(
    store,
    bridgeClient,
    integrationController
  );

  const openResult = (result: SearchResult) => {
    navigationService.openExternal(result.url);
  };

  const SearchPageImpl = observer(() => {
    return (
      <SearchPage
        results={store.results}
        loading={store.loading}
        profiles={integrationStore.profiles}
        onConnectTool={navigationService.openSettings}
        init={controller.init}
        openResult={openResult}
        onSearch={controller.search}
      />
    );
  });

  return { SearchPage: SearchPageImpl };
};
