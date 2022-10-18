import { Button } from '@highbeam/components';
import { useEffect } from 'react';
import { ExternalLink } from 'react-feather';
import styles from './account.module.css';

export const AccountSettings = ({
  onLogout,
  onBillingPortalOpen,
  integrationLimit,
  planName,
  init,
}: {
  onLogout: () => void;
  onBillingPortalOpen: () => void;
  planName: string;
  integrationLimit: number | null;
  init: () => void;
}) => {
  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className={styles.container}>
      <section>
        <h3 className={styles.heading}>Billing</h3>
        <span className={styles.heading}>
          <strong>Current plan</strong>: {planName}
        </span>
        <br />
        <span className={styles.heading}>
          <strong>Integrations</strong>: {integrationLimit || 'Unknown'}
        </span>
        <p>
          Highbeam partners with Stripe to manage billing and payments. You can
          use the billing portal to manage your payment method and switch plans.
        </p>
        <Button onClick={onBillingPortalOpen}>
          Billing portal&nbsp;&nbsp;
          <ExternalLink size="1em" />
        </Button>
      </section>
      <hr className={styles.divider} />
      <Button variant="danger" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};
