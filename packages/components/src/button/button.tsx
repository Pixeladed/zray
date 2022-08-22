import * as React from 'react';
import { PropsWithChildren } from 'react';
import styles from './button.module.css';

type ButtonProps = PropsWithChildren<{
  onClick?(): void;
}>;

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
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
