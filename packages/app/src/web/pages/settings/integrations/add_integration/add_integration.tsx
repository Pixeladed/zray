import { useEffect } from 'react';
import { TappableArea, Button } from '@highbeam/components';
import { IntegrationInfo } from '../../../../../interface/intergration';
import styles from './add_integration.module.css';
import { Link } from 'react-router-dom';
import { Routes } from '../../../../../routes';

export const AddIntegrationPage = ({
  init,
  integrations,
  onConnect,
}: {
  init: () => void;
  integrations: readonly IntegrationInfo[];
  onConnect: (id: string) => void;
}) => {
  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Connect a tool</h3>
      <div className={styles.integrationList}>
        {integrations.map(integration => (
          <TappableArea
            onClick={() => onConnect(integration.id)}
            key={integration.name}
          >
            <div className={styles.integration}>
              <img
                src={integration.icon}
                alt={integration.name}
                className={styles.integrationIcon}
              />
              <p className={styles.integrationLabel}>{integration.name}</p>
            </div>
          </TappableArea>
        ))}
      </div>
      <Link to={Routes.integrations().absolute}>
        <Button>Cancel</Button>
      </Link>
    </div>
  );
};
