import { Button } from '@highbeam/components';
import { ExternalLink } from 'react-feather';
import styles from './account.module.css';

export const AccountSettings = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Billing</h3>
      <p>
        Highbeam partners with Stripe to manage billing and payments. You can
        use the billing portal to manage your payment method and switch plans.
      </p>
      <Button>
        Billing portal&nbsp;&nbsp;
        <ExternalLink size="1em" />
      </Button>
      <hr className={styles.divider} />
      <Button variant="danger" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};
