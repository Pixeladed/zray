import { TappableArea } from '@highbeam/components';
import { ComponentType } from 'react';
import { IntegrationInfo } from '../../../../interface/intergration';
import { SearchResult } from '../../../../interface/search';
import styles from './search_result_card.module.css';

export type ResultComponent<T extends SearchResult> = ComponentType<{
  result: T;
  integration: IntegrationInfo;
}>;

export type ResultProps = {
  result: SearchResult;
  integration: IntegrationInfo;
  onClick: () => void;
};

export const SearchResultCard = ({
  result,
  integration,
  onClick,
}: ResultProps) => {
  return (
    <TappableArea onClick={onClick}>
      <div className={styles.resultCard}>
        <div className={styles.iconGroup}>
          <img
            className={styles.icon}
            alt={`${integration.name} search result`}
            src={integration.icon}
          />
          {!!result.icon && (
            <img
              className={styles.secondaryIcon}
              src={result.icon}
              alt={result.title}
            />
          )}
        </div>

        <div>
          <h3 className={styles.resultCardTitle}>{result.title}</h3>
          <p className={styles.resultCardDescription}>{result.preview}</p>
        </div>
      </div>
    </TappableArea>
  );
};
