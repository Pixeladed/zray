import { MessageSearchResult } from '../../../../interface/search';
import { ResultComponent } from './search_result_card';
import styles from './search_result_card.module.css';

export const MessageResult: ResultComponent<MessageSearchResult> = ({
  result,
  integration,
}) => {
  return (
    <div>
      <h3 className={styles.resultCardTitle}>{result.text}</h3>
      <p className={styles.resultCardDescription}>
        {integration.name} &middot;{' '}
        <span className={styles.type}>{result.type}</span> &middot; in{' '}
        {result.channel} by {result.author.name}
      </p>
    </div>
  );
};
