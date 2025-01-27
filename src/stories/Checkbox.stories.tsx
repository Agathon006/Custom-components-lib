import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../components/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
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

export const Radio: Story = {
  args: {
    label: 'Select Option',
    type: 'radio',
  },
};

export const Disabled: Story = {
  args: {
    label: 'I am disabled',
    disabled: true,
  },
};

export const CustomLabelText: Story = {
  args: {
    label: 'Custom Label Text',
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
