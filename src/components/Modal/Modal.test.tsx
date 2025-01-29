import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalProps } from './Modal';
import '@testing-library/jest-dom';

const MODAL_TEXT = 'This is a modal';

describe('Modal', () => {
  const renderComponent = (props: Partial<ModalProps>) => {
    return render(<Modal {...props} />);
  };

  it('does not render when open is false', () => {
    renderComponent({ open: false, children: MODAL_TEXT });
    expect(screen.queryByText(MODAL_TEXT)).not.toBeInTheDocument();
  });

  it('closes when clicking the overlay', async () => {
    const onClose = jest.fn();
    renderComponent({ open: true, children: MODAL_TEXT, onClose });

    const overlay = screen.getByTestId('modal-overlay');
    await userEvent.click(overlay as HTMLElement);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when clicking the close button', async () => {
    const onClose = jest.fn();
    renderComponent({ open: true, children: MODAL_TEXT, onClose });

    const closeButton = screen.getByTestId('modal-close-button');
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
