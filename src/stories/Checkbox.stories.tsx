/// <reference path="../../declarations.d.ts" />

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/Checkbox';

import AppleSvgIcon from '../assets/icons/apple.svg';
import AirplaySvgIcon from '../assets/icons/airplay.svg';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept Terms and Conditions',
  },
};

export const WithCustomClassName: Story = {
  args: {
    label: 'Accept Terms and Conditions',
    className: 'my-custom-class',
  },
};

export const Disabled: Story = {
  args: {
    label: 'I am disabled',
    disabled: true,
  },
};

export const CustomColor: Story = {
  args: {
    label: 'White on dark',
    color: '#6f6f6f',
  },
};

export const Checked: Story = {
  args: {
    label: 'I agree to the terms',
    checked: true,
  },
};

export const DefaultChecked: Story = {
  args: {
    label: 'I agree to the terms',
    defaultChecked: true,
  },
};

export const WithAriaLabel: Story = {
  args: {
    label: 'Accessible Checkbox',
    'aria-label': 'checkbox-aria-label',
  },
};

export const WithCustomIcon: Story = {
  args: {
    label: 'Checkbox with custom icon',
    color: '#ff0000',
    size: 'big',
    customIcon: <AppleSvgIcon />,
  },
};

export const WithCustomIcon2: Story = {
  args: {
    label: 'Checkbox with custom icon',
    color: '#ff0000',
    size: 'big',
    customIcon: <AirplaySvgIcon />,
  },
};
