import React, { FC } from 'react';
import classes from './TextField.module.scss';

import { clsx } from '../../utils/clsx';

type TextFieldVariant = 'outlined' | 'filled' | 'standard';

export type TextFieldProps = {
  id: string;
  label?: string;
  type?: string;
  variant?: TextFieldVariant;
  className?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  defaultValue?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export const TextField: FC<TextFieldProps> = ({
  id,
  label,
  type = 'text',
  variant = 'outlined',
  className,
  placeholder,
  required,
  error,
  helperText,
  ...props
}) => {

  const cssClasses = clsx(
    classes.textField,
    className,
    classes[`textField-${variant}`],
    error ? classes['textField-error'] : null
  );

  return (
    <div className={classes.textFieldWrapper}>
      {label && (
        <label className={classes.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        {...props}
        id={id}
        type={type}
        className={cssClasses}
        placeholder={placeholder}
        required={required}
      />
      {helperText && (
        <span className={clsx(classes.helperText, error ? classes['textField-error'] : null)}>
          {helperText}
        </span>
      )}
    </div>
  );
};
