import React, { FC } from 'react';
import classes from './Checkbox.module.scss';
import { clsx } from '../../utils/clsx';

type CheckboxSize = 'small' | 'medium' | 'big';

export type CheckboxProps = {
  label?: string;
  type?: string;
  size?: CheckboxSize;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>;

export const Checkbox: FC<CheckboxProps> = ({
  label,
  type = 'checkbox',
  size = 'medium',
  className,
  ...props
}) => {
  return (
    <label className={clsx(className, classes.label_wrapper)} data-testid="checkbox-wrapper">
      <input
        {...props}
        type={type}
        className={clsx(classes.checkbox, classes[`checkbox_${size}`])}
      />
      <span className={clsx(classes.label_text, classes[`label_text_${size}`])}>{label}</span>
    </label>
  );
};
