import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../components/Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCloseHandler: Story = {
  args: {
    open: true,
    onClose: () => alert('onClose handler was called!'),
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p>Modal window with a close handler</p>
        <button onClick={() => alert('First button clicked!')}>First Button</button>
        <button onClick={() => alert('Second button clicked!')}>Second Button</button>
      </div>
    ),
  },
};
