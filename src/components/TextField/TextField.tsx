import React, { FC, useState, useRef } from 'react';
import classes from './TextField.module.scss';
import { clsx } from '../../utils/clsx';

type TextFieldVariant = 'outlined' | 'filled' | 'standard';

export type TextFieldProps = {
  id: string;
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
  id,
  label,
  errorText,
  type = 'text',
  variant = 'outlined',
  className,
  placeholder,
  required,
  error,
  value,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isInputFilled = inputRef.current
    ? inputRef.current.value !== ''
    : value !== '' && value !== undefined;

  const cssClasses = clsx(
    classes['text-field'],
    className,
    classes[`text-field-${variant}`],
    error ? classes['error'] : null
  );

  const labelTextClasses = clsx(
    classes['label-text'],
    (isFocused || isInputFilled) && classes['label-text-active'],
    classes[`label-text-${variant}`]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <label className={classes['label-wrapper']}>
      {label && (
        <span className={clsx(labelTextClasses, error ? classes['error'] : null)}>
          {label}
        </span>
      )}
      <input
        {...props}
        ref={inputRef}
        id={id}
        type={type}
        className={cssClasses}
        placeholder={placeholder}
        required={required}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
      />
      {errorText && (
        <span className={clsx(classes['error-text'], error ? classes['error'] : null)}>
          {errorText}
        </span>
      )}
    </label>
  );
};
