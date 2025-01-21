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
    classes['label'],
    (isFocused || isInputFilled) && classes['label-focused'],
    classes[`label-${variant}`]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  const truncatedLabel = label && label.length > 25 ? `${label.slice(0, 25)}...` : label;

  return (
    <div className={classes['text-field-wrapper']}>
      <label className={classes['label-and-input-wrapper']} htmlFor={id}>
        {label && (
          <span className={clsx(labelTextClasses, error ? classes['error'] : null)}>
            {truncatedLabel}
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
      </label>
      {errorText && (
        <span className={clsx(classes['error-text'], error ? classes['error'] : null)}>
          {errorText}
        </span>
      )}
    </div>
  );
};
