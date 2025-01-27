import React, { FC, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import ArrowDownIcon from '../../assets/icons/triangleDown.svg';
import { clsx } from '../../utils/clsx';
import { TextField } from '../TextField';
import classes from './Select.module.scss';

export type SelectOption = {
  id: string;
  label: string;
};

export type SelectProps = {
  label?: string;
  options?: SelectOption[];
  value?: SelectOption['id'];
  onChange?: (value: SelectOption['id']) => void;
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
        const selectedInput = selectWrapperRef.current?.children[0].children[0] as HTMLElement;
        selectedInput.focus();
      } else {
        const selectedOption = optionsListRef.current.children[focusedIndex] as HTMLElement;
        selectedOption?.focus();
      }
    }
  }, [isOpen, focusedIndex, options]);

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
        rightIcon={<ArrowDownIcon />}
        rightIconClassName={isOpen && classes.upside_down}
        {...props}
      />
      {isOpen &&
        createPortal(
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
          </div>,
          selectWrapperRef.current as HTMLElement
        )}
    </div>
  );
};
