import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { Routes as RouterRoutes, Route, HashRouter } from 'react-router-dom';
import { Routes } from './routes';
import { createSearchPage } from './pages/search/create';
import { createSettingsPage } from './pages/settings/create';
import { NavigationService } from './services/navigation/navigation_service';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const context = window;
const navigationService = new NavigationService(context);

const { SearchPage } = createSearchPage(context);
const { SettingsPage } = createSettingsPage(context);

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
