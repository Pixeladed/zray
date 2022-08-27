import { useEffect } from 'react';
import { TappableArea, Button } from '@highbeam/components';
import { IntegrationInfo } from '../../../../../interface/intergration';
import styles from './add_integration.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Routes } from '../../../../../routes';

export const AddIntegrationPage = ({
  init,
  integrations,
  onConnect,
}: {
  init: () => void;
  integrations: readonly IntegrationInfo[];
  onConnect: (id: string) => Promise<any>;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, [init]);

  const handleClick = (integration: IntegrationInfo) => {
    onConnect(integration.id);
    navigate(Routes.integrations().absolute);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Connect a tool</h3>
      <div className={styles.integrationList}>
        {integrations.map(integration => (
          <TappableArea
            onClick={() => handleClick(integration)}
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
