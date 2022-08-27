import * as React from 'react';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './button.module.css';

type ButtonProps = PropsWithChildren<{
  onClick?(): void;
  variant?: 'default' | 'primary';
}>;

export const Button = ({
  onClick,
  children,
  variant = 'default',
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        variant === 'default' && styles.default,
        variant === 'primary' && styles.primary
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TappableArea = ({
  children,
  onClick,
}: React.PropsWithChildren<{
  onClick?(): void;
}>) => {
  return (
    <button className={styles.tappableArea} onClick={onClick}>
      {children}
    </button>
  );
};
