import React, { FC } from 'react';
import './Button.scss';

import makeClassName from '../../utils/makeClassName';

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
  const cssClasses = makeClassName('button', {
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

export default Button;
