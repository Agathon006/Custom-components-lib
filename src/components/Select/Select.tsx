import React, { FC, useState, useEffect } from 'react';
import classes from './Select.module.scss';
import { clsx } from '../../utils/clsx';

export type SelectProps = {
  id: string;
  label?: string;
  options?: { [key: string]: string };
} & React.ComponentPropsWithoutRef<'div'>;

export const Select: FC<SelectProps> = ({ id, label = 'Select...', options = {}, ...props }) => {
  const [selected, setSelected] = useState<{ optionText: string; optionValue: string }>({
    optionText: '',
    optionValue: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('[data-select-option]')) {
        if (!(event.target as HTMLElement).closest('[data-select]')) {
          setIsOpen(false);
        } else {
          setIsOpen(prevState => !prevState);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onOptionClick = (optionText: string, optionValue: string) => {
    setSelected({ optionText, optionValue });
    setIsOpen(prevState => !prevState);
  };

  return (
    <label className={classes.select_wrapper} data-select>
      <div {...props} id={id} className={classes.select} tabIndex={0}>
        <span className={classes.selected_value}>{selected.optionText}</span>
      </div>
      <span className={classes.label_span}>{label}</span>
      {isOpen && (
        <div className={clsx(classes.options, isOpen && classes.options_active)}>
          {Object.entries(options).map(([optionText, optionValue]) => (
            <div
              key={optionValue}
              className={classes.option}
              onClick={() => onOptionClick(optionText, optionValue)}
              data-select-option
            >
              {optionText}
            </div>
          ))}
        </div>
      )}
    </label>
  );
};
