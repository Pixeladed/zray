import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { Routes as RouterRoutes, Route, HashRouter } from 'react-router-dom';
import { Routes } from './routes';
import { createSearchPage } from './pages/search/create';
import { createAddIntegrationPage } from './pages/add_integration/create';
import { NavigationService } from './services/navigation/navigation_service';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const context = window;
const navigationService = new NavigationService(context);

const { SearchPage } = createSearchPage();
const { AddIntegrationPage } = createAddIntegrationPage(context);

root.render(
  <React.StrictMode>
    <HashRouter>
      <RouterRoutes>
        <Route path={Routes.search()} element={<SearchPage />} />
        <Route
          path={Routes.addIntegration()}
          element={<AddIntegrationPage />}
        />
        <Route path="*" element={<>{navigationService.currentHref()}</>} />
      </RouterRoutes>
    </HashRouter>
  </React.StrictMode>
);
