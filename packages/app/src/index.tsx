import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import '@highbeam/components/build/style.css';
import { Routes as RouterRoutes, Route, HashRouter } from 'react-router-dom';
import { Routes } from './routes';
import { createSearchPage } from './web/pages/search/create';
import { createSettingsPage } from './web/pages/settings/create';
import { NavigationService } from './web/services/navigation/navigation_service';
import { BridgeClient } from './web/base/bridge_client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const context = window;
const bridgeClient = new BridgeClient(context);
const navigationService = new NavigationService(context, bridgeClient);
const { SearchPage } = createSearchPage({ bridgeClient, navigationService });
const { SettingsPage } = createSettingsPage({
  bridgeClient,
  navigationService,
});

root.render(
  <React.StrictMode>
    <HashRouter>
      <RouterRoutes>
        <Route index={true} element={<SearchPage />} />
        <Route path={Routes.search().relative} element={<SearchPage />} />
        <Route
          path={Routes.settings().relativeParent}
          element={<SettingsPage />}
        />
      </RouterRoutes>
    </HashRouter>
  </React.StrictMode>
);
