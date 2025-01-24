import React, { FC } from 'react';
import classes from './TextField.module.scss';
import { clsx } from '../../utils/clsx';

type TextFieldVariant = 'outlined' | 'filled' | 'standard';

export type TextFieldProps = {
  label?: string;
  errorText?: string;
  type?: string;
  variant?: TextFieldVariant;
  className?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentPropsWithoutRef<'input'>;

export const TextField: FC<TextFieldProps> = ({
  label,
  errorText,
  type = 'text',
  variant = 'outlined',
  className,
  placeholder = '',
  required,
  error,
  value,
  onChange,
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
        required={required}
        value={value}
        onChange={onChange}
      />
      {label && <span className={labelTextClasses}>{label}</span>}
      {errorText && <span className={errorTextClasses}>{errorText}</span>}
    </label>
  );
};
