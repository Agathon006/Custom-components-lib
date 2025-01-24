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
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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
  leftIcon,
  rightIcon,
  ...props
}) => {

  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;
  const hasIcons = hasLeftIcon && hasRightIcon;

  let inputIconClass = null;
  let labelIconClass = null;
  if (hasIcons) {
    inputIconClass = classes.text_field_with_both_icons;
    labelIconClass = classes.label_text_with_both_icons;
  } else if (hasLeftIcon) {
    inputIconClass = classes.text_field_with_left_icon;
    labelIconClass = classes.label_text_with_left_icon;
  } else if (hasRightIcon) {
    inputIconClass = classes.text_field_with_right_icon;
    labelIconClass = classes.label_text_with_right_icon;
  }

  const cssClasses = clsx(
    classes.text_field,
    classes[`text_field_${variant}`],
    inputIconClass,
    error && classes.error
  );

  const labelTextClasses = clsx(
    classes.label_text,
    classes[`label_text_${variant}`],
    labelIconClass,
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
        autoComplete='off'
      />
      {label && <span className={labelTextClasses}>{label}</span>}
      {errorText && <span className={errorTextClasses}>{errorText}</span>}
      {leftIcon && <div className={classes.left_icon}>{leftIcon}</div>}
      {rightIcon && <div className={classes.right_icon}>{rightIcon}</div>}
    </label>
  );
};
