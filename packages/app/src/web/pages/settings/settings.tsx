import React, { useEffect } from 'react';
import styles from './settings.module.css';

export const SettingsPage = ({
  init,
  AddIntegrationsPage,
}: {
  init: () => void;
  AddIntegrationsPage: React.ComponentType;
}) => {
  useEffect(init, [init]);
  return (
    <div>
      <div className={styles.titleBar} />
      <div>
        <AddIntegrationsPage />
      </div>
    </div>
  );
};
