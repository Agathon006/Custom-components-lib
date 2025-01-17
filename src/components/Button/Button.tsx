import React, { FC } from 'react';
import './Button.scss';

import { clsx } from '../../utils/clsx';

type ButtonSize = 'small' | 'medium' | 'big';
type ButtonVariant = 'text' | 'contained' | 'outlined';

export type ButtonProps = {
  children?: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
} & React.ComponentPropsWithoutRef<'button'>;

export const Button: FC<ButtonProps> = ({
  children,
  size = 'medium',
  variant = 'contained',
  ...props
}) => {
  const cssClasses = clsx('button', {
    'button-small': size === 'small',
    'button-big': size === 'big',
    'button-text': variant === 'text',
    'button-outlined': variant === 'outlined',
  });

  return (
    <button {...props} className={cssClasses}>
      {children}
    </button>
  );
};
