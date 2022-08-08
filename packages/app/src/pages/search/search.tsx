import styles from './search.module.css';

export function SearchPage() {
  return (
    <div className={styles.page}>
      <input placeholder="What are you looking for?" className={styles.input} />
    </div>
  );
}
