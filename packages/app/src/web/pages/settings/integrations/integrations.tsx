import { ComponentType } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { Routes } from '../../../../routes';

export const IntegrationsSettings = ({
  AddIntegrationPage,
  IntegrationsListPage,
}: {
  AddIntegrationPage: ComponentType;
  IntegrationsListPage: ComponentType;
}) => {
  return (
    <RouterRoutes>
      <Route index={true} element={<IntegrationsListPage />} />
      <Route
        path={Routes.addIntegration().relative}
        element={<AddIntegrationPage />}
      />
    </RouterRoutes>
  );
};
