import React, { FC, useEffect, useState } from 'react';
import classes from './Select.module.scss';
import { clsx } from '../../utils/clsx';
import ArrowDownIcon from '../../assets/icons/triangleDown.svg';

export type SelectProps = {
  id: string;
  label?: string;
  options?: { id: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export const Select: FC<SelectProps> = ({
  id,
  label = 'Select...',
  options = [{ id: '', label: 'None' }],
  value,
  onChange,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isSelectClick = !!target.closest(`[data-select]`);
      const isOptionClick = !!target.closest(`[data-select-option]`);

      if (!isOptionClick && !isSelectClick) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSelectClick = () => {
    setIsOpen(prevState => !prevState);
  };

  const onOptionClick = (id: string) => {
    setIsOpen(false);
    if (onChange) onChange(id);
  };

  const selectedOption = options.find(option => option.id === value);

  return (
    <label className={clsx(classes.select_wrapper, className)} role="select_wrapper">
      <div
        {...props}
        id={id}
        className={classes.select}
        tabIndex={0}
        onClick={() => onSelectClick()}
        data-select
        role="select"
      >
        <span className={classes.selected_value}>{selectedOption?.label}</span>
        <div className={clsx(classes.arrow_icon, isOpen && classes.arrow_icon_open)}>
          <ArrowDownIcon />
        </div>
      </div>
      <span className={classes.label_span}>{label}</span>
      {isOpen && (
        <div className={clsx(classes.options, isOpen && classes.options_active)}>
          {options.map(({ id, label }) => (
            <div
              key={id}
              className={clsx(classes.option, id === '' && classes.option_disabled)}
              onClick={() => onOptionClick(id)}
              data-select-option
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </label>
  );
};
