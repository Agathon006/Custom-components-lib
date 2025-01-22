import React, { FC, useState, useEffect } from 'react';
import classes from './Select.module.scss';

export type SelectProps = {
  id: string;
  label?: string;
  options?: { [key: string]: string };
} & React.ComponentPropsWithoutRef<'label'>;

export const Select: FC<SelectProps> = ({ id, label = 'Select...', options = {}, ...props }) => {
  const [selected, setSelected] = useState<{ optionText: string; optionValue: string }>({
    optionText: '',
    optionValue: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('[data-select="true"]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleChange = (optionText: string, optionValue: string) => {
    setSelected({ optionText, optionValue });
  };

  return (
    <label
      {...props}
      id={id}
      className={`${classes.select} ${isOpen ? classes.open : ''}`}
      tabIndex={0}
      onClick={toggleDropdown}
      data-select="true"
    >
      <span className={classes.selected_value}>{selected.optionText || label}</span>
      {isOpen && (
        <div className={classes.options}>
          {Object.entries(options).map(([optionText, optionValue]) => (
            <div
              key={optionValue}
              className={classes.option}
              onClick={() => handleChange(optionText, optionValue)}
            >
              {optionText}
            </div>
          ))}
        </div>
      )}
    </label>
  );
};
