import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import ArrowDownIcon from '../../assets/icons/triangleDown.svg';
import ArrowUpIcon from '../../assets/icons/triangleUp.svg';
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

  const optionsList = isOpen && (
    <div className={clsx(classes.options, isOpen && classes.options_active)} role="listbox">
      {options ? (
        options.map(({ id, label }) => (
          <div key={id} className={classes.option} onClick={() => onChange?.(id)} role="listitem">
            {label}
          </div>
        ))
      ) : (
        <div className={classes.option_disabled}>No options</div>
      )}
    </div>
  );

  return (
    <div
      className={clsx(classes.select_wrapper, className)}
      onClick={() => setIsOpen(prevState => !prevState)}
      ref={comboboxRef}
      data-testid="select-wrapper"
    >
      <TextField
        readOnly
        className={classes.select}
        tabIndex={0}
        role="combobox"
        label={label}
        value={selectedOption ? selectedOption.label : ''}
        rightIcon={isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        {...props}
      />
      {optionsList && createPortal(optionsList, comboboxRef.current as HTMLElement)}
    </div>
  );
};
