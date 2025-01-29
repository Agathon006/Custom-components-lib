import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '.';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCloseHandler: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <button onClick={handleOpen}>Open Modal</button>
        <Modal open={open} onClose={handleClose}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p>Modal window with a close handler</p>
            <button onClick={() => alert('First button clicked!')}>First Button</button>
            <button onClick={() => alert('Second button clicked!')}>Second Button</button>
          </div>
        </Modal>
      </div>
    );
  },
};
