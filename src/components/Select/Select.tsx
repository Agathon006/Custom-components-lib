import React, { FC, useState, useEffect } from 'react';
import classes from './Select.module.scss';
import { clsx } from '../../utils/clsx';
import { GoTriangleDown as ArrowDown } from 'react-icons/go';

export type SelectProps = {
  id: string;
  label?: string;
  options?: { [key: string]: string };
} & React.ComponentPropsWithoutRef<'div'>;

export const Select: FC<SelectProps> = ({
  id,
  label = 'Select...',
  options = { None: '' },
  ...props
}) => {
  const [selected, setSelected] = useState<{ optionText: string; optionValue: string }>({
    optionText: '',
    optionValue: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isSelectClick = !!target.closest(`[data-select]`);
      const isOptionClick = !!target.closest(`[data-select-option]`);

      if (!isOptionClick) {
        if (!isSelectClick) {
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
    if (optionValue === '') return;
    setSelected({ optionText, optionValue });
    setIsOpen(prevState => !prevState);
  };

  const optionsWithEmptyCase = Object.keys(options).length === 0 ? { None: '' } : options;

  return (
    <label className={classes.select_wrapper}>
      <div {...props} id={id} className={classes.select} tabIndex={0} data-select>
        <span className={classes.selected_value}>{selected.optionText}</span>
        <div className={clsx(classes.arrow_icon, isOpen && classes.arrow_icon_open)}>
          <ArrowDown />
        </div>
      </div>
      <span className={classes.label_span}>{label}</span>
      {isOpen && (
        <div className={clsx(classes.options, isOpen && classes.options_active)}>
          {Object.entries(optionsWithEmptyCase).map(([optionText, optionValue]) => (
            <div
              key={optionValue}
              className={clsx(classes.option, optionValue === '' && classes.option_disabled)}
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
