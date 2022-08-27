import React, { useMemo } from 'react';
import {
  Routes as RouterRoutes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { Routes } from '../../../routes';
import classNames from 'classnames';
import styles from './settings.module.css';

export const SettingsPage = ({
  IntegrationsSettings,
}: {
  IntegrationsSettings: React.ComponentType;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Settings</h2>
        </div>
      </div>
      <div className={styles.sidebarAndContent}>
        <aside className={styles.sidebar}>
          <SidebarLink
            href={Routes.integrations().absolute}
            index={Routes.settings().absolute}
            label="Integrations"
          />
        </aside>
        <div className={styles.content}>
          <RouterRoutes>
            <Route index={true} element={<IntegrationsSettings />} />
            <Route
              path={Routes.integrations().relativeParent}
              element={<IntegrationsSettings />}
            />
          </RouterRoutes>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({
  href,
  label,
  index,
}: {
  href: string;
  label: string;
  index?: string;
}) => {
  const location = useLocation();
  const active = useMemo(
    () => location.pathname.startsWith(href) || location.pathname === index,
    [location, href, index]
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
