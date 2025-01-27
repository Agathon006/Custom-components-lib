import React, { FC } from 'react';
import classes from './Button.module.scss';
import { clsx } from '../../utils';

type ButtonSize = 'small' | 'medium' | 'big';
type ButtonVariant = 'text' | 'contained' | 'outlined';

export type ButtonProps = {
  children?: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
} & React.ComponentPropsWithoutRef<'button'>;

export const Button: FC<ButtonProps> = ({
  children,
  size = 'medium',
  variant = 'contained',
  className,
  ...props
}) => {
  const cssClasses = clsx(
    classes.button,
    className,
    classes[`button_${size}`],
    classes[`button_${variant}`]
  );

  return (
    <button {...props} className={cssClasses}>
      {children}
    </button>
  );
};
