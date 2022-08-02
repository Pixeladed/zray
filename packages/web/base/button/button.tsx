import classNames from 'classnames';
import React, { MouseEvent } from 'react';
import styles from './button.module.css';

export const Button = ({
  children,
  onClick,
}: React.PropsWithChildren<{
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}>) => {
  return (
    <button className={classNames(styles.button)} onClick={onClick}>
      {children}
    </button>
  );
};
