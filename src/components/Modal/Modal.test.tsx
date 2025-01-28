import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalProps } from './Modal';
import '@testing-library/jest-dom';

describe('Modal', () => {
  const renderComponent = (props: Partial<ModalProps>) => {
    return render(<Modal {...props} />);
  };

});
