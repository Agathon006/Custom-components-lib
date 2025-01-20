import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from '../components/TextField';

const meta = {
  title: 'Example/TextField',
  component: TextField,
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: {
    id: 'outlined-textfield',
    label: 'Outlined Label',
    placeholder: 'Enter text',
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    id: 'filled-textfield',
    label: 'Filled Label',
    placeholder: 'Enter text',
    variant: 'filled',
    defaultValue: 'Initial value',
  },
};

export const Standard: Story = {
  args: {
    id: 'standard-textfield',
    label: 'Standard Label',
    placeholder: 'Enter text',
    variant: 'standard',
    required: true,
  },
};

export const ErrorState: Story = {
  args: {
    id: 'error-textfield',
    label: 'Error Label',
    placeholder: 'Enter text',
    error: true,
    helperText: 'This is an error message',
  },
};

export const WithHelperText: Story = {
  args: {
    id: 'helper-textfield',
    label: 'Helper Text Label',
    placeholder: 'Enter text',
    helperText: 'This is helper text',
  },
};

export const DifferentType: Story = {
  args: {
    id: 'password-textfield',
    label: 'Password',
    type: 'password',
  },
};
