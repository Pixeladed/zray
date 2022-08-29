import { MessageSearchResult } from '../../../../interface/search';
import { ResultComponent } from './search_result_card';
import styles from './search_result_card.module.css';

export const MessageResult: ResultComponent<MessageSearchResult> = ({
  result,
}) => {
  return (
    <div>
      <h3 className={styles.resultCardTitle}>{result.text}</h3>
      <p className={styles.resultCardDescription}>
        {!!result.icon && (
          <>
            <img
              src={result.icon}
              className={styles.inlineIcon}
              alt={result.text}
            />
            <span className={styles.type}>{result.type}</span>
          </>
        )}
        &nbsp;in {result.channel} by {result.author.name}
      </p>
    </div>
  );
};
