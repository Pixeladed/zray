import Image from 'next/image';
import { Button } from '../button/button';
import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brandBlock}>
        <Image src="/logo.svg" width={32} height={32} />
        <h3 className={styles.brandTitle}>Z-Ray</h3>
      </div>
      <Button>Get beta access</Button>
    </header>
  );
};
