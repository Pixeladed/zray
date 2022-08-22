import React from 'react';

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
