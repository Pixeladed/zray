import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import reportWebVitals from './reportWebVitals';
import { Routes as RouterRoutes, Route, HashRouter } from 'react-router-dom';
import { Routes } from './routes';
import { createSearchPage } from './pages/search/create';
import { createAddIntegrationPage } from './pages/add_integration/create';
import { IntegrationService } from './services/integration/integration_service';
import { NavigationService } from './services/navigation/navigation_service';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const integrationService = new IntegrationService();
const navigationService = new NavigationService(window);

const { SearchPage } = createSearchPage();
const { AddIntegrationPage } = createAddIntegrationPage({ integrationService });

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
