import { Button } from '@highbeam/components';
import styles from './account.module.css';

export const AccountSettings = () => {
  return (
    <div className={styles.container}>
      <Button>Logout</Button>
    </div>
  );
};
