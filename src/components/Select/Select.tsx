import React, { FC, useState } from 'react';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import ArrowDownIcon from '../../assets/icons/triangleDown.svg';
import { clsx } from '../../utils/clsx';
import { TextField } from '../TextField';
import classes from './Select.module.scss';

export type SelectProps = {
  label?: string;
  options?: { id: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export const Select: FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const comboboxRef = useOnClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const selectedOption = options?.find(option => option.id === value);

  return (
    <div
      className={clsx(classes.select_wrapper, className)}
      onClick={() => setIsOpen(prevState => !prevState)}
      ref={comboboxRef}
      data-testid="select-wrapper"
    >
      <div className={clsx(classes.arrow_icon, isOpen && classes.arrow_icon_open)}>
        <ArrowDownIcon />
      </div>
      <TextField
        readOnly
        className={classes.select}
        tabIndex={0}
        role="combobox"
        label={label}
        value={selectedOption ? selectedOption.label : ''}
        {...props}
      />
      <div className={clsx(classes.options, isOpen && classes.options_active)} role="listbox">
        {options?.map(({ id, label }) => (
          <div
            key={id}
            className={clsx(classes.option, id === '' && classes.option_disabled)}
            onClick={() => onChange && onChange(id)}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};
