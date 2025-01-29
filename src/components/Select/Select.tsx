import React, { FC, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import ArrowDownIcon from '../../assets/icons/triangleDown.svg';
import { clsx } from '../../utils';
import { TextField } from '../TextField';
import classes from './Select.module.scss';

export type SelectOption = {
  /** The unique identifier for the option. */
  id: string;
  /** The display label for the option. */
  label: string;
};

export type SelectProps = {
  /** The label for the select component. */
  label?: string;
  /** The list of selectable options. */
  options?: SelectOption[];
  /** The currently selected option's id. */
  value?: SelectOption['id'];
  /** Callback function called when an option is selected. */
  onChange?: (value: SelectOption['id']) => void;
} & React.ComponentPropsWithoutRef<'div'>;

/** A select component with options that can be toggled open and closed with a click. */
export const Select: FC<SelectProps> = ({
  label,
  options = [],
  value,
  onChange,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectWrapperRef = useOnClickOutside<HTMLDivElement>(() => setIsOpen(false));
  const optionsListRef = useRef<HTMLDivElement | null>(null);
  const selectedOption = options.find(option => option.id === value);

  useEffect(() => {
    if (isOpen) {
      const selectedIndex = options.findIndex(option => option.id === value);
      setFocusedIndex(selectedIndex !== -1 ? selectedIndex : -1);
    }
  }, [isOpen, options, value]);

  useEffect(() => {
    if (isOpen && optionsListRef.current) {
      if (focusedIndex !== -1) {
        const selectedOption = optionsListRef.current.children[focusedIndex] as HTMLElement;
        selectedOption?.focus();
      }
    }
  }, [isOpen, focusedIndex, options]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsOpen(prevState => !prevState);
    } else if (e.key === 'ArrowDown' && isOpen) {
      setFocusedIndex(prevIndex => Math.min(prevIndex + 1, options.length - 1));
    } else if (e.key === 'ArrowUp' && isOpen) {
      setFocusedIndex(prevIndex => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <div
      className={clsx(classes.select_wrapper, className)}
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
        rightIcon={<ArrowDownIcon className={clsx(isOpen && classes.upside_down)} />}
        {...props}
      />
      {isOpen &&
        selectWrapperRef.current &&
        createPortal(
          <div
            className={clsx(classes.options, isOpen && classes.options_active)}
            role="listbox"
            ref={optionsListRef}
          >
            {options.length > 0 ? (
              options.map(({ id, label }, index) => (
                <div
                  key={id}
                  className={classes.option}
                  onClick={() => onChange?.(id)}
                  onKeyDown={e => e.key === 'Enter' && onChange?.(id)}
                  role="listitem"
                  tabIndex={-1}
                  ref={el => focusedIndex === index && el?.focus()}
                >
                  {label}
                </div>
              ))
            ) : (
              <div className={classes.option_disabled}>No options</div>
            )}
          </div>,
          selectWrapperRef.current
        )}
    </div>
  );
};
