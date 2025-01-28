import React, { FC } from 'react';
import classes from './Switch.module.scss';
import { clsx } from '../../utils';

export type SwitchProps = {
  label?: string;
  type?: 'checkbox';
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export const Switch: FC<SwitchProps> = ({
  label,
  type = 'checkbox',
  className,
  ...props
}) => {

  return (
    <label
      className={clsx(className, classes.switch_wrapper)}
      data-testid="switch-wrapper"
    >
      <input {...props} type={type} className={classes.switch_checkbox} role='checkbox' />
      <div className={classes.switch_slider}></div>
      {label && <span className={classes.switch_label_text}>{label}</span>}
    </label>
  );
};
