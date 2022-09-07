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
import { createIntegrationService } from './web/services/integration/create';
import { createAuth } from './base/auth/create';
import { webConfig } from './web/base/config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const context = window;
const { AuthProvider, AuthGate } = createAuth({
  config: webConfig.auth0,
});
const bridgeClient = new BridgeClient(context);
const navigationService = new NavigationService(context, bridgeClient);

const { integrationStore, integrationController } = createIntegrationService({
  bridgeClient,
});
const { SearchPage } = createSearchPage({
  navigationService,
  bridgeClient,
  integrationStore,
});
const { SettingsPage } = createSettingsPage({
  integrationStore,
  integrationController,
});

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AuthGate>
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
      </AuthGate>
    </AuthProvider>
  </React.StrictMode>
);
