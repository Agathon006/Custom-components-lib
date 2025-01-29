import React, { FC } from 'react';
import classes from './Modal.module.scss';
import { clsx } from '../../utils';
import CloseButtonIcon from '../../assets/icons/closeButton.svg';

export type ModalProps = {
  open?: boolean;
  onClose?: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

export const Modal: FC<ModalProps> = ({ open, onClose, children, className, ...props }) => {
  return (
    <>
      <div
        onClick={onClose}
        className={clsx(classes.modal_overlay, open && classes.modal_overlay_open)}
      />
      <div
        {...props}
        className={clsx(classes.modal, open && classes.modal_open, className)}
        role="dialog"
      >
        <CloseButtonIcon onClick={onClose} className={classes.modal_close_button} />
        {children}
      </div>
    </>
  );
};
