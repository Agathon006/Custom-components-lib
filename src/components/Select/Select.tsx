import React, { FC, useState, useRef, useEffect } from 'react';
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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectWrapperRef = useOnClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const selectedOption = options?.find(option => option.id === value);
  const optionsListRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsOpen(prevState => !prevState);
      if (!isOpen && options && options.length > 0) {
        setFocusedIndex(-1);
      }
    } else if (e.key === 'ArrowDown' && isOpen && options && options.length > 0) {
      setFocusedIndex(prevIndex => Math.min(prevIndex + 1, options.length - 1));
    } else if (e.key === 'ArrowUp' && isOpen && options && options.length > 0) {
      setFocusedIndex(prevIndex => Math.max(prevIndex - 1, -1));
    }
  };

  useEffect(() => {
    if (isOpen && optionsListRef.current && optionsListRef.current.children.length > 0) {
      if (focusedIndex === -1) {
        selectWrapperRef.current?.focus();
      } else {
        const selectedOption = optionsListRef.current.children[focusedIndex] as HTMLElement;
        selectedOption?.focus();
      }
    }
  }, [isOpen, focusedIndex, options]);

  const optionsList = isOpen && (
    <div
      className={clsx(classes.options, isOpen && classes.options_active)}
      role="listbox"
      ref={optionsListRef}
    >
      {options ? (
        options.map(({ id, label }) => (
          <div
            key={id}
            className={classes.option}
            onClick={() => onChange?.(id)}
            onKeyDown={e => e.key === 'Enter' && onChange?.(id)}
            role="listitem"
            tabIndex={-1}
          >
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
      tabIndex={0}
      onClick={() => setIsOpen(prevState => !prevState)}
      onKeyDown={handleKeyDown}
      ref={selectWrapperRef}
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
      {optionsList && createPortal(optionsList, selectWrapperRef.current as HTMLElement)}
    </div>
  );
};
