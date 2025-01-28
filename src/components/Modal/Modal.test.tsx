import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalProps } from './Modal';
import '@testing-library/jest-dom';

const CLASS_NAMES = {
  modal: 'modal',
  modalOpen: 'modal_open',
  modalOverlay: 'modal_overlay',
  modalOverlayOpen: 'modal_overlay_open',
};

const MODAL_TEXT = 'This is a modal';
const ARIA_LABEL = 'modal-window';

describe('Modal', () => {
  const renderComponent = (props: Partial<ModalProps>) => {
    return render(<Modal {...props} />);
  };

  it('renders a modal with content', () => {
    const component = renderComponent({ open: true, children: MODAL_TEXT });

    expect(component.getByText(MODAL_TEXT)).toBeInTheDocument();
  });

  it('renders modal with custom className', () => {
    const component = renderComponent({
      open: true,
      children: MODAL_TEXT,
      className: 'custom-modal-class',
    });
    const modal = component.getByRole('dialog');

    expect(modal).toHaveClass('custom-modal-class');
  });

  it('renders modal with overlay when open', () => {
    const component = renderComponent({ open: true, children: MODAL_TEXT });

    expect(component.container.querySelector(`.${CLASS_NAMES.modalOverlay}`)).toHaveClass(
      CLASS_NAMES.modalOverlayOpen
    );
  });

  it('does not render overlay when modal is closed', () => {
    const component = renderComponent({ open: false, children: MODAL_TEXT });

    expect(component.container.querySelector(`.${CLASS_NAMES.modalOverlay}`)).not.toHaveClass(
      CLASS_NAMES.modalOverlayOpen
    );
  });

  it('renders modal with the correct class when open', () => {
    const component = renderComponent({ open: true, children: MODAL_TEXT });
    const modal = component.getByRole('dialog');

    expect(modal).toHaveClass(CLASS_NAMES.modalOpen);
  });

  it('does not render modal with the open class when closed', () => {
    const component = renderComponent({ open: false, children: MODAL_TEXT });
    const modal = component.getByRole('dialog');

    expect(modal).not.toHaveClass(CLASS_NAMES.modalOpen);
  });

  it('handles onClose event when overlay is clicked', async () => {
    const onClose = jest.fn();
    const component = renderComponent({ open: true, onClose, children: MODAL_TEXT });
    const overlay = component.container.querySelector(`.${CLASS_NAMES.modalOverlay}`);

    if (overlay) {
      await userEvent.click(overlay);
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', async () => {
    const onClose = jest.fn();
    const component = renderComponent({ open: true, onClose, children: MODAL_TEXT });
    const modal = component.getByRole('dialog');

    await userEvent.click(modal);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders with HTML attributes', () => {
    const component = renderComponent({
      open: true,
      'aria-label': ARIA_LABEL,
      children: MODAL_TEXT,
    });
    const modal = component.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-label', ARIA_LABEL);
  });

  it('renders with all props', async () => {
    const onClose = jest.fn();
    const modalProps: ModalProps = {
      open: true,
      onClose,
      className: 'test-class',
    };
    const component = renderComponent({ ...modalProps, children: MODAL_TEXT });
    const modal = component.getByRole('dialog');
    const overlay = component.container.querySelector(`.${CLASS_NAMES.modalOverlay}`);

    expect(modal).toHaveClass('test-class');
    expect(component.getByText(MODAL_TEXT)).toBeInTheDocument();

    if (overlay) {
      await userEvent.click(overlay);
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
