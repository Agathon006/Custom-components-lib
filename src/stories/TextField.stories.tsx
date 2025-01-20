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

export const OutlinedError: Story = {
  args: {
    id: 'outlined-textfield-error',
    label: 'Outlined Label',
    placeholder: 'Enter text',
    variant: 'outlined',
    error: true,
    helperText: 'This is an error message',
  },
};

export const OutlinedErrorNoText: Story = {
  args: {
    id: 'outlined-textfield-error-no-text',
    label: 'Outlined Label',
    placeholder: 'Enter text',
    variant: 'outlined',
    error: true,
  },
};

export const Filled: Story = {
  args: {
    id: 'filled-textfield',
    label: 'Filled Label',
    placeholder: 'Enter text',
    variant: 'filled',
  },
};

export const FilledError: Story = {
  args: {
    id: 'filled-textfield-error',
    label: 'Filled Label',
    placeholder: 'Enter text',
    variant: 'filled',
    error: true,
    helperText: 'This is an error message',
  },
};

export const FilledErrorNoText: Story = {
  args: {
    id: 'filled-textfield-error-no-text',
    label: 'Filled Label',
    placeholder: 'Enter text',
    variant: 'filled',
    error: true,
  },
};

export const Standard: Story = {
  args: {
    id: 'standard-textfield',
    label: 'Standard Label',
    placeholder: 'Enter text',
    variant: 'standard',
  },
};

export const StandardError: Story = {
  args: {
    id: 'standard-textfield-error',
    label: 'Standard Label',
    placeholder: 'Enter text',
    variant: 'standard',
    error: true,
    helperText: 'This is an error message',
  },
};

export const StandardErrorNoText: Story = {
  args: {
    id: 'standard-textfield-error-no-text',
    label: 'Standard Label',
    placeholder: 'Enter text',
    variant: 'standard',
    error: true,
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

export const WithDefaultValue: Story = {
  args: {
    id: 'default-textfield',
    label: 'Default Value Label',
    placeholder: 'Enter text',
    defaultValue: 'Initial Value',
  },
};

export const DifferentType: Story = {
  args: {
    id: 'password-textfield',
    label: 'Password',
    type: 'password',
  },
};

export const RequiredField: Story = {
  args: {
    id: 'required-textfield',
    label: 'Required Field Label',
    placeholder: 'Enter text',
    required: true,
  },
};
