import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import '@highbeam/components/build/style.css';
import { Routes as RouterRoutes, Route, HashRouter } from 'react-router-dom';
import { Routes } from './routes';
import { createSearchPage } from './web/pages/search/create';
import { createSettingsPage } from './web/pages/settings/create';
import { NavigationService } from './web/services/navigation/navigation_service';
import { IntegrationStore } from './web/services/integration/integration_store';
import { getBridge } from './web/base/bridge';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const context = window;
const navigationService = new NavigationService(context);
const integrationStore = new IntegrationStore();
const bridge = getBridge(context);

bridge.on('integration:setAvailable', (event, data) => {
  console.log('received event', event, data);
  integrationStore.setIntegrations(data.integrations);
});

const { SearchPage } = createSearchPage(context);
const { SettingsPage } = createSettingsPage({ context, integrationStore });

root.render(
  <React.StrictMode>
    <HashRouter>
      <RouterRoutes>
        <Route path={Routes.search()} element={<SearchPage />} />
        <Route path={Routes.settings()} element={<SettingsPage />} />
        <Route path="*" element={<>{navigationService.currentHref()}</>} />
      </RouterRoutes>
    </HashRouter>
  </React.StrictMode>
);
