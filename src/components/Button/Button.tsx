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
  const rootClasses = ['ccl-button'];

  if (size === 'small') {
    rootClasses.push('ccl-button-small');
  } else if (size === 'big') {
    rootClasses.push('ccl-button-big');
  }

  if (variant === 'text') {
    rootClasses.push('ccl-button-text');
  } else if (variant === 'outlined') {
    rootClasses.push('ccl-button-outlined');
  }

  return (
    <button {...props} className={rootClasses.join(' ')}>
      {children}
    </button>
  );
};

export default Button;
