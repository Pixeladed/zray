import React, { useMemo } from 'react';
import { Routes as RouterRoutes, Route, Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import { NavigationService } from '../../services/navigation/navigation_service';
import classNames from 'classnames';
import styles from './settings.module.css';

export const SettingsPage = ({
  AddIntegrationsPage,
  navigationService,
}: {
  AddIntegrationsPage: React.ComponentType;
  navigationService: NavigationService;
}) => {
  return (
    <div>
      <div className={styles.titleBar} />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Settings</h2>
      </div>
      <div className={styles.sidebarAndContent}>
        <aside className={styles.sidebar}>
          <SidebarLink
            navigationService={navigationService}
            href={Routes.addIntegration()}
            label="Add integration"
          />
          <SidebarLink
            navigationService={navigationService}
            href={'/'}
            label="Add integration"
          />
        </aside>
        <div className={styles.content}>
          <RouterRoutes>
            <Route
              path={Routes.addIntegration()}
              element={<AddIntegrationsPage />}
            />
            <Route path="*" element={<AddIntegrationsPage />} />
          </RouterRoutes>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({
  href,
  label,
  navigationService,
}: {
  href: string;
  label: string;
  navigationService: NavigationService;
}) => {
  const active = useMemo(
    () => navigationService.isPathActive(href),
    [navigationService, href]
  );
  return (
    <Link
      className={classNames(styles.sidebarLink, active && styles.active)}
      to={href}
    >
      {label}
    </Link>
  );
};
