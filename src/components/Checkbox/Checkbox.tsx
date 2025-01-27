import React, { FC } from 'react';
import classes from './Checkbox.module.scss';
import { clsx, getLuminance } from '../../utils';

type CheckboxSize = 'small' | 'medium' | 'big';

export type CheckboxProps = {
  label?: string;
  type?: 'checkbox';
  size?: CheckboxSize;
  color?: string;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;



export const Checkbox: FC<CheckboxProps> = ({
  label,
  type = 'checkbox',
  size = 'medium',
  color = '#90caf9',
  className,
  ...props
}) => {
  const style = {
    '--checkbox-color': color,
    '--checkbox-fill-color': getLuminance(color) < 0.5 ? 'white' : 'black',
  } as React.CSSProperties;

  return (
    <label
      className={clsx(className, classes.label_wrapper)}
      data-testid="checkbox-wrapper"
      style={style}
    >
      <input {...props} type={type} className={classes.checkbox} />
      <svg
        className={clsx(classes.checkbox_icon, classes[`checkbox_icon_${size}`])}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        focusable="false"
        aria-hidden="true"
      >
        <rect width="24" height="24" />
        <path d="M9 16.2l-4.2-4.2 1.4-1.4L9 13.4l7.8-7.8 1.4 1.4L9 16.2z" />
      </svg>
      <span className={clsx(classes.label_text, classes[`label_text_${size}`])}>{label}</span>
    </label>
  );
};
