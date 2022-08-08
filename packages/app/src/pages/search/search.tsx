import { Integration } from '../../services/search/provider';
import styles from './search.module.css';

const availableIntegrations: readonly Pick<Integration, 'icon' | 'name'>[] = [
  { icon: 'https://via.placeholder.com/32x32', name: 'Gmail' },
  { icon: 'https://via.placeholder.com/32x32', name: 'Google Drive' },
  { icon: 'https://via.placeholder.com/32x32', name: 'Slack' },
];

export function SearchPage() {
  return (
    <div className={styles.page}>
      <input placeholder="What are you looking for?" className={styles.input} />
      <ul className={styles.integrations}>
        {availableIntegrations.map(({ name, icon }) => (
          <li key={name} className={styles.integration}>
            <img src={icon} alt={name} className={styles.integrationIcon} />
          </li>
        ))}
      </ul>
    </div>
  );
}
