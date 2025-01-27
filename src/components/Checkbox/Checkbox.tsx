import React, { FC } from 'react';
import classes from './Checkbox.module.scss';
import { clsx } from '../../utils/clsx';

export type CheckboxProps = {
  label?: string;
  type?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export const Checkbox: FC<CheckboxProps> = ({ label, type = 'checkbox', className, ...props }) => {
  return (
    <label className={clsx(className, classes.label_wrapper)} data-testid="checkbox-wrapper">
      <input {...props} type={type} className={classes.checkbox} />
      <span className={classes.label_text}>{label}</span>
    </label>
  );
};
