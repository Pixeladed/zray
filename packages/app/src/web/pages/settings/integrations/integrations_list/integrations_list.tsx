import { useEffect } from 'react';
import { ProfileWithIntegration } from '../../../../services/integration/integration_controller';
import styles from './integrations_list.module.css';

export const IntegrationsListPage = ({
  init,
  profiles,
}: {
  init: () => void;
  profiles: readonly ProfileWithIntegration[];
}) => {
  useEffect(init, [init]);

  return (
    <div className={styles.container}>
      {profiles.map(profile => (
        <div
          className={styles.profileContainer}
          key={`${profile.integration.id}/${profile.id}`}
        >
          <img
            className={styles.profileIcon}
            src={profile.integration.icon}
            alt={profile.integration.name}
          />
          <div>
            <h4 className={styles.profileName}>{profile.name}</h4>
            <small className={styles.profileIntegration}>
              {profile.integration.name} &middot; {profile.id}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};
