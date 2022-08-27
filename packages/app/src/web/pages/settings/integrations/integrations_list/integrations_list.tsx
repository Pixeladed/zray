import { Button } from '@highbeam/components';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IntegrationProfile } from '../../../../../interface/intergration';
import { Routes } from '../../../../../routes';
import { ProfileWithIntegration } from '../../../../services/integration/integration_controller';
import styles from './integrations_list.module.css';

export const IntegrationsListPage = ({
  init,
  onRemove,
  profiles,
}: {
  init: () => void;
  onRemove: (id: IntegrationProfile) => void;
  profiles: readonly ProfileWithIntegration[];
}) => {
  useEffect(init, [init]);

  return (
    <div className={styles.container}>
      {!!profiles.length && (
        <header className={styles.header}>
          <h2 className={styles.title}>{profiles.length} connected tools</h2>
          <Link to={Routes.addIntegration().absolute}>
            <Button variant="primary">Connect a tool</Button>
          </Link>
        </header>
      )}
      {profiles.map(profile => (
        <div className={styles.profileContainer} key={profile.id}>
          <div className={styles.profileInfo}>
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
          <Button onClick={() => onRemove(profile)}>Remove</Button>
        </div>
      ))}
      {!profiles.length && (
        <div className={styles.empty}>
          <p className={styles.emptyLead}>
            Looks like you don&apos;t have any tools connected
          </p>
          <Link to={Routes.addIntegration().absolute}>
            <Button variant="primary">Connect a tool</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
