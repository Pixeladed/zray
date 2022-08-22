import React from 'react';
import styles from './settings.module.css';

export const SettingsPage = ({
  AddIntegrationsPage,
}: {
  AddIntegrationsPage: React.ComponentType;
}) => {
  return (
    <div>
      <div>
        <AddIntegrationsPage />
      </div>
    </div>
  );
};
