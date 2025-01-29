import React, { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from '../../utils';
import classes from './Modal.module.scss';
import CloseButtonIcon from '../../assets/icons/closeButton.svg';

export type ModalProps = {
  open?: boolean;
  onClose?: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

//A modal component that renders a closable, focus-trapped modal dialog.
export const Modal: FC<ModalProps> = ({ open, onClose, children, className, ...props }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    firstElement.focus();

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    open &&
    createPortal(
      <>
        <div onClick={onClose} className={classes.modal_overlay} data-testid="modal-overlay" />
        <div
          {...props}
          ref={modalRef}
          className={clsx(classes.modal, className)}
          role="dialog"
          aria-modal="true"
        >
          <CloseButtonIcon
            onClick={onClose}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClose?.();
              }
            }}
            className={classes.modal_close_button}
            tabIndex={0}
            role="button"
            data-testid="modal-close-button"
          />
          {children}
        </div>
      </>,
      document.body
    )
  );
};
