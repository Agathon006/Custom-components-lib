import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from '../../utils';
import classes from './Modal.module.scss';
import CloseButtonIcon from '../../assets/icons/closeButton.svg';

export type ModalProps = {
  open?: boolean;
  onClose?: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

export const Modal: FC<ModalProps> = ({ open, onClose, children, className, ...props }) => {
  return (
    open &&
    createPortal(
      <>
        <div onClick={onClose} className={classes.modal_overlay} data-testid="modal-overlay" />
        <div {...props} className={clsx(classes.modal, className)} role="dialog">
          <CloseButtonIcon
            onClick={onClose}
            className={classes.modal_close_button}
            data-testid="modal-close-button"
          />
          {children}
        </div>
      </>,
      document.body
    )
  );
};
