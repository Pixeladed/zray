import { Button } from '../../base/button/button';
import styles from './search.module.css';

export function SearchPage() {
  return (
    <div className={styles.page}>
      <input placeholder="What are you looking for?" className={styles.input} />
      <div className={styles.empty}>
        <p className={styles.emptyLead}>
          Looks like you don&apos;t have any tools connected at the moment, add
          one to get started
        </p>
        <Button>Connect a tool</Button>
      </div>
    </div>
  );
}
