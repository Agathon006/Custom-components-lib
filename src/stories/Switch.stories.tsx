import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '../components/Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    color: {
      control: 'color',
      description: 'Switch color',
    },
    size: {
      control: {
        type: 'radio',
        options: ['small', 'medium', 'big'],
      },
      description: 'Switch size',
    },
    label: {
      control: 'text',
      description: 'Label for the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Switch Label',
    size: 'medium',
    color: 'default',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Switch',
    size: 'small',
    color: 'default',
  },
};

export const Big: Story = {
  args: {
    label: 'Big Switch',
    size: 'big',
    color: 'default',
  },
};

export const CustomColor: Story = {
  args: {
    label: 'Custom Color Switch',
    size: 'medium',
    color: '#ff6347',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Switch',
    size: 'medium',
    color: 'default',
    disabled: true,
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Switch',
    size: 'medium',
    color: 'default',
    checked: true,
  },
};
