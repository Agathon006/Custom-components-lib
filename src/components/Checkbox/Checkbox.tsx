import React, { FC } from 'react';
import classes from './Checkbox.module.scss';
import { clsx, getLuminance } from '../../utils';
import DefaultCheckboxSvgIcon from '../../assets/icons/checkbox.svg';

type CheckboxSize = 'small' | 'medium' | 'big';

type CustomCSSProperties = React.CSSProperties & {
  '--checkbox-fill-color'?: string;
  '--checkbox-fill-text-color'?: string;
};

export type CheckboxProps = {
  /** Optional label for the checkbox. */
  label?: string;
  /** The size of the checkbox. */
  size?: CheckboxSize;
  /** Optional custom icon for the checkbox. */
  customIcon?: React.ReactElement | null;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

/** A functional component that renders a customizable checkbox with an optional label and icon. */
export const Checkbox: FC<CheckboxProps> = ({
  label,
  type = 'checkbox',
  size = 'medium',
  color = 'var(--color-primary)',
  customIcon,
  className,
  ...props
}) => {
  const style: CustomCSSProperties = {
    '--checkbox-fill-color': color,
    '--checkbox-fill-text-color':
      getLuminance(color) < 0.5 ? 'var(--color-white)' : 'var(--color-black)',
  };

  return (
    <label
      className={clsx(className, classes.label_wrapper)}
      data-testid="checkbox-wrapper"
      style={style}
    >
      <input {...props} type={type} className={classes.checkbox} role="checkbox" />
      {customIcon &&
        React.cloneElement(customIcon, {
          className: clsx(
            classes.checkbox_icon,
            classes.checkbox_icon_custom,
            classes[`checkbox_icon_${size}`]
          ),
        })}
      <DefaultCheckboxSvgIcon
        className={clsx(classes.checkbox_icon, classes[`checkbox_icon_${size}`])}
      />
      <span className={clsx(classes.label_text, classes[`label_text_${size}`])}>{label}</span>
    </label>
  );
};
