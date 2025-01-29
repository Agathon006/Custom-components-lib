import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from '../components/Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCloseHandler: Story = {
  args: {
    open: true,
    onClose: () => alert('onClose handler was called!'),
    children: 'Modal window with a close handler',
  },
};