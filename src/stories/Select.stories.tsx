import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Select, SelectProps } from '../components/Select';

const meta: Meta<SelectProps> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    id: {
      control: 'text',
      description: 'The unique ID of the Select component.',
    },
    label: {
      control: 'text',
      description: 'The label displayed for the Select component.',
    },
    options: {
      control: 'object',
      description: 'An object containing options for the Select component.',
    },
  },
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Default: Story = {
  args: {
    id: 'default-select',
    label: 'Choose an option',
    options: {
      Option1: 'value1',
      Option2: 'value2',
      Option3: 'value3',
    },
  },
};

export const EmptyOptions: Story = {
  args: {
    id: 'empty-options-select',
    label: 'No options available',
    options: {},
  },
};

export const ManySelectors: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '100px' }}>
      <Select {...args} id="first-select" label="First Selector" />
      <Select {...args} id="second-select" label="Second Selector" />
    </div>
  ),
  args: {
    options: {
      Option1: 'value1',
      Option2: 'value2',
      Option3: 'value3',
    },
  },
};
