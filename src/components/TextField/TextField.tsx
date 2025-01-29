import React, { FC } from 'react';
import classes from './TextField.module.scss';
import { clsx } from '../../utils';

type TextFieldVariant = 'outlined' | 'filled' | 'standard';

export type TextFieldProps = {
  label?: string;
  errorText?: string;
  type?: string;
  variant?: TextFieldVariant;
  className?: string;
  placeholder?: string;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'input'>;

// A functional component that renders a text field with customizable options.
export const TextField: FC<TextFieldProps> = ({
  label,
  errorText,
  type = 'text',
  variant = 'outlined',
  className,
  placeholder = '',
  error,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const cssClasses = clsx(
    classes.text_field,
    classes[`text_field_${variant}`],
    error && classes.error
  );

  const labelTextClasses = clsx(
    classes.label_text,
    classes[`label_text_${variant}`],
    error && classes.error
  );

  const errorTextClasses = clsx(classes.error_text, error && classes.error);

  return (
    <label className={clsx(className, classes.label_wrapper)} data-testid="text-field-wrapper">
      <input
        {...props}
        type={type}
        className={cssClasses}
        placeholder={placeholder}
        autoComplete="off"
      />
      {label && <span className={labelTextClasses}>{label}</span>}
      {errorText && <span className={errorTextClasses}>{errorText}</span>}
      {leftIcon && <div className={clsx(classes.icon, classes.icon_left)}>{leftIcon}</div>}
      {rightIcon && <div className={clsx(classes.icon, classes.icon_right)}>{rightIcon}</div>}
    </label>
  );
};
