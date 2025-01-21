import React, { FC, useState, useRef } from 'react';
import classes from './TextField.module.scss';
import { clsx } from '../../utils/clsx';

type TextFieldVariant = 'outlined' | 'filled' | 'standard';

export type TextFieldProps = {
  id: string;
  label?: string;
  helperText?: string;
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
  helperText,
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

  const labelClasses = clsx(
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
      <div className={classes['label-and-input-wrapper']}>
        {label && (
          <label className={clsx(labelClasses, error ? classes['error'] : null)} htmlFor={id}>
            {truncatedLabel}
          </label>
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
      </div>
      {helperText && (
        <span className={clsx(classes['helper-text'], error ? classes['error'] : null)}>
          {helperText}
        </span>
      )}
    </div>
  );
};
