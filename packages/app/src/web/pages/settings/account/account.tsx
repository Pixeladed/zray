import { Button } from '@highbeam/components';
import styles from './account.module.css';

export const AccountSettings = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className={styles.container}>
      <Button variant="danger" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};