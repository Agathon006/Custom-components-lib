import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    children: 'Some text',
    variant: 'text',
  },
};

export const Contained: Story = {
  args: {
    children: 'Some text',
    variant: 'contained',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Some text',
    variant: 'outlined',
  },
};

export const Big: Story = {
  args: {
    children: 'Some text',
    size: 'big',
  },
};

export const Medium: Story = {
  args: {
    children: 'Some text',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    children: 'Some text',
    size: 'small',
  },
};
