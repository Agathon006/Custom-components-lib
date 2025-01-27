/// <reference path="../../declarations.d.ts" />

import { Meta, StoryObj } from '@storybook/react';
import { TextField, TextFieldProps } from '../components/TextField';
import React from 'react';

import SvgIcon from '../assets/icons/triangleDown.svg';

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

export const NoIcons: Story = {
  args: {
    id: 'no-icons',
    label: 'No Icons',
    placeholder: 'Enter text',
  },
};

export const LeftIconOnly: Story = {
  args: {
    id: 'left-icon-only',
    label: 'Left Icon Only',
    placeholder: 'Enter text',
    leftIcon: <SvgIcon />,
  },
};

export const RightIconOnly: Story = {
  args: {
    id: 'right-icon-only',
    label: 'Right Icon Only',
    placeholder: 'Enter text',
    rightIcon: <SvgIcon />,
  },
};

export const BothIcons: Story = {
  args: {
    id: 'both-icons',
    label: 'Both Icons',
    placeholder: 'Enter text',
    leftIcon: <SvgIcon />,
    rightIcon: <SvgIcon />,
  },
};

export const FilledNoIcons: Story = {
  args: {
    id: 'filled-no-icons',
    label: 'No Icons (Filled)',
    placeholder: 'Enter text',
    variant: 'filled',
  },
};

export const FilledLeftIconOnly: Story = {
  args: {
    id: 'filled-left-icon-only',
    label: 'Left Icon Only (Filled)',
    placeholder: 'Enter text',
    variant: 'filled',
    leftIcon: <SvgIcon />,
  },
};

export const FilledRightIconOnly: Story = {
  args: {
    id: 'filled-right-icon-only',
    label: 'Right Icon Only (Filled)',
    placeholder: 'Enter text',
    variant: 'filled',
    rightIcon: <SvgIcon />,
  },
};

export const FilledBothIcons: Story = {
  args: {
    id: 'filled-both-icons',
    label: 'Both Icons (Filled)',
    placeholder: 'Enter text',
    variant: 'filled',
    leftIcon: <SvgIcon />,
    rightIcon: <SvgIcon />,
  },
};

export const StandardNoIcons: Story = {
  args: {
    id: 'standard-no-icons',
    label: 'No Icons (Standard)',
    placeholder: 'Enter text',
    variant: 'standard',
  },
};

export const StandardLeftIconOnly: Story = {
  args: {
    id: 'standard-left-icon-only',
    label: 'Left Icon Only (Standard)',
    placeholder: 'Enter text',
    variant: 'standard',
    leftIcon: <SvgIcon />,
  },
};

export const StandardRightIconOnly: Story = {
  args: {
    id: 'standard-right-icon-only',
    label: 'Right Icon Only (Standard)',
    placeholder: 'Enter text',
    variant: 'standard',
    rightIcon: <SvgIcon />,
  },
};

export const StandardBothIcons: Story = {
  args: {
    id: 'standard-both-icons',
    label: 'Both Icons (Standard)',
    placeholder: 'Enter text',
    variant: 'standard',
    leftIcon: <SvgIcon />,
    rightIcon: <SvgIcon />,
  },
};
