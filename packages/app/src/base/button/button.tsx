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
