import React from 'react';
import styles from './settings.module.css';

export const SettingsPage = ({
  AddIntegrationsPage,
}: {
  AddIntegrationsPage: React.ComponentType;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleBar}></div>
      <div>
        <AddIntegrationsPage />
      </div>
    </div>
  );
};
