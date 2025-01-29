import React, { useState } from 'react';
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
      description: 'An array of options for the Select component.',
    },
    value: {
      control: 'text',
      description: 'The current value of the Select component.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback triggered when the value changes.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Default: Story = {
  render: args => {
    const [selectedValue, setSelectedValue] = useState('');

    const options = [
      { id: 'text1', label: 'Text 1' },
      { id: 'text2', label: 'Text 2sssssssssssssssssssssssssssssssssssssssssss' },
      { id: 'text3', label: 'Text 3' },
    ];

    return (
      <Select
        id="default-select"
        label="choose an option"
        options={options}
        value={selectedValue}
        onChange={value => {
          setSelectedValue(value);
          args.onChange?.(value);
        }}
      />
    );
  },
};

export const EmptyOptions: Story = {
  render: args => {
    const [selectedValue, setSelectedValue] = useState('');

    return (
      <Select
        id="empty-options-select"
        label="No options available"
        value={selectedValue}
        onChange={value => {
          setSelectedValue(value);
          args.onChange?.(value);
        }}
      />
    );
  },
};

export const ManySelectors: Story = {
  render: args => {
    const [firstValue, setFirstValue] = useState('');
    const [secondValue, setSecondValue] = useState('');

    const options = [
      { id: 'text1', label: 'Text 1' },
      { id: 'text2', label: 'Text 2sssssssssssssssssssssssssssssssssssssssssss' },
      { id: 'text3', label: 'Text 3' },
    ];

    return (
      <div style={{ display: 'flex', gap: '100px' }}>
        <Select
          {...args}
          id="first-select"
          label="First Selector"
          value={firstValue}
          options={options}
          onChange={value => {
            setFirstValue(value);
            args.onChange?.(value);
          }}
        />
        <Select
          {...args}
          id="second-select"
          label="Second Selector"
          value={secondValue}
          onChange={value => {
            setSecondValue(value);
            args.onChange?.(value);
          }}
        />
      </div>
    );
  },
};
