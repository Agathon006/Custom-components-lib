import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '.';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

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
