import React, { FC } from 'react';
import './Button.css';

type ButtonSize = 'small' | 'medium' | 'big';
type ButtonVariant = 'text' | 'contained' | 'outlined';

export type ButtonProps = {
  children?: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const Button: FC<ButtonProps> = ({
  children,
  size = 'medium',
  variant = 'contained',
  ...props
}) => {
  const rootClasses = ['button'];

  if (size === 'small') {
    rootClasses.push('button-small');
  } else if (size === 'big') {
    rootClasses.push('button-big');
  }

  if (variant === 'text') {
    rootClasses.push('button-text');
  } else if (variant === 'outlined') {
    rootClasses.push('button-outlined');
  }

  return (
    <button {...props} className={rootClasses.join(' ')}>
      {children}
    </button>
  );
};

export default Button;
