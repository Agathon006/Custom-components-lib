import React, { FC, useState } from 'react';
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
  defaultValue?: string;
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
  defaultValue,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!defaultValue);

  const cssClasses = clsx(
    classes.textField,
    className,
    classes[`textField-${variant}`],
    error ? classes['error'] : null
  );

  const labelClasses = clsx(
    classes.label,
    isFocused || hasValue ? classes.labelFocused : null,
    classes[`label-${variant}`]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!event.target.value);
  };

  return (
    <div className={classes.textFieldWrapper}>
      <div className={classes.labelAndInputWrapper}>
        {label && (
          <label className={clsx(labelClasses, error ? classes['error'] : null)} htmlFor={id}>
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleInputChange}
          defaultValue={defaultValue}
        />
      </div>
      {helperText && (
        <span className={clsx(classes.helperText, error ? classes['error'] : null)}>
          {helperText}
        </span>
      )}
    </div>
  );
};
