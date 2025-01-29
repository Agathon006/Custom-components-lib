import React, { FC } from 'react';
import classes from './TextField.module.scss';
import { clsx } from '../../utils';

type TextFieldVariant = 'outlined' | 'filled' | 'standard';

export type TextFieldProps = {
  /** Optional label text */
  label?: string;
  /** Optional error message */
  errorText?: string;
  /** Variant of the text field */
  variant?: TextFieldVariant;
  /** Error state of the text field */
  error?: boolean;
  /** Optional icon to place on the left side of the text field */
  leftIcon?: React.ReactNode;
  /** Optional icon to place on the right side of the text field */
  rightIcon?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'input'>;

/** A functional component that renders a text field with customizable options. */
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
