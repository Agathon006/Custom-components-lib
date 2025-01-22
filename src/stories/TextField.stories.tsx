import { Meta, StoryObj } from '@storybook/react';
import { TextField, TextFieldProps } from '../components/TextField';

const meta: Meta<TextFieldProps> = {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
    error: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<TextFieldProps>;

export const OutlinedWithLabelWithErrorText: Story = {
  args: {
    id: 'outlined-with-label-with-error-text',
    label: 'Outlined Label',
    variant: 'outlined',
    errorText: 'This is an error message',
    placeholder: 'Enter text',
  },
};

export const FilledWithLabelWithErrorText: Story = {
  args: {
    id: 'filled-with-label-with-error-text',
    label: 'Filled Label',
    variant: 'filled',
    errorText: 'This is an error message',
    placeholder: 'Enter text',
  },
};

export const StandardWithLabelWithErrorText: Story = {
  args: {
    id: 'standard-with-label-with-error-text',
    label: 'Standard Label',
    variant: 'standard',
    errorText: 'This is an error message',
    placeholder: 'Enter text',
  },
};

export const OutlinedWithLabelWithErrorTextWithError: Story = {
  args: {
    id: 'outlined-with-label-with-error-text-with-error',
    label: 'Outlined Label',
    variant: 'outlined',
    errorText: 'This is an error message',
    placeholder: 'Enter text',
    error: true,
  },
};

export const FilledWithLabelWithErrorTextWithError: Story = {
  args: {
    id: 'filled-with-label-with-error-text-with-error',
    label: 'Filled Label',
    variant: 'filled',
    errorText: 'This is an error message',
    placeholder: 'Enter text',
    error: true,
  },
};

export const StandardWithLabelWithErrorTextWithError: Story = {
  args: {
    id: 'standard-with-label-with-error-text-with-error',
    label: 'Standard Label',
    variant: 'standard',
    errorText: 'This is an error message',
    placeholder: 'Enter text',
    error: true,
  },
};
