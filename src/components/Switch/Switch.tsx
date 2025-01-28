import React, { FC } from 'react';
import classes from './Switch.module.scss';
import { adjustBrightness, clsx } from '../../utils';

type CheckboxSize = 'small' | 'medium' | 'big';

type CustomCSSProperties = React.CSSProperties & {
  '--wrapper-width'?: string;
  '--wrapper-height'?: string;
  '--switch-color'?: string;
  '--switch-color-dark'?: string;
};

export type SwitchProps = {
  label?: string;
  size?: CheckboxSize;
  color?: string;
  type?: 'checkbox';
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export const Switch: FC<SwitchProps> = ({
  label,
  size = 'medium',
  color = 'default',
  type = 'checkbox',
  className,
  ...props
}) => {
  const style: CustomCSSProperties = {
    '--wrapper-width': size === 'small' ? '28px' : size === 'big' ? '40px' : '34px',
    '--wrapper-height': size === 'small' ? '16px' : size === 'big' ? '24px' : '20px',
    '--switch-color': color !== 'default' ? color : 'var(--color-primary)',
    '--switch-color-dark': color !== 'default' ? adjustBrightness(color, 0.8) : 'var(--color-grey)',
  };

  return (
    <label
      className={clsx(className, classes.switch_wrapper)}
      data-testid="switch-wrapper"
      style={style}
    >
      <input {...props} type={type} className={classes.switch_checkbox} role="checkbox" />
      <div className={classes.switch_slider}></div>
      {label && <span className={classes.switch_label_text}>{label}</span>}
    </label>
  );
};
