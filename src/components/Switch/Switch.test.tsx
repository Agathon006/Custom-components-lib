import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch, SwitchProps } from './Switch';
import '@testing-library/jest-dom';

const CLASS_NAMES = {
  switchLabelTextSmall: 'switch_label_text_small',
  switchLabelTextBig: 'switch_label_text_big',
};

const SWITCH_LABEL = 'Toggle switch';
const SWITCH_TEST_LABEL = 'Test Label';
const SWITCH_COLOR = 'red';

describe('Switch', () => {
  const renderComponent = (props: Partial<SwitchProps>) => {
    return render(<Switch {...props} />);
  };

  it('renders a switch with no label', () => {
    const component = renderComponent({});

    expect(component.getByTestId('switch-wrapper')).toBeInTheDocument();
    expect(component.queryByText(SWITCH_LABEL)).not.toBeInTheDocument();
  });

  it('renders a switch with a small label', () => {
    const component = renderComponent({ size: 'small', label: SWITCH_LABEL });

    expect(component.getByText(SWITCH_LABEL)).toBeInTheDocument();
    expect(component.getByText(SWITCH_LABEL)).toHaveClass(CLASS_NAMES.switchLabelTextSmall);
  });

  it('renders with default color', () => {
    const component = renderComponent({ label: SWITCH_LABEL });

    expect(component.getByTestId('switch-wrapper')).toHaveStyle('--switch-color: var(--color-primary)');
  });

  it('renders with custom color', () => {
    const component = renderComponent({ color: SWITCH_COLOR, label: SWITCH_LABEL });

    expect(component.getByTestId('switch-wrapper')).toHaveStyle('--switch-color: red');
  });

  it('toggles checkbox state when clicked', async () => {
    const component = renderComponent({});
    const switchInput = component.getByRole('checkbox');

    expect(switchInput).not.toBeChecked();

    await userEvent.click(switchInput);
    expect(switchInput).toBeChecked();

    await userEvent.click(switchInput);
    expect(switchInput).not.toBeChecked(); 
  });

  it('renders with disabled state', () => {
    const component = renderComponent({ disabled: true, label: SWITCH_LABEL });
    const switchInput = component.getByRole('checkbox');

    expect(switchInput).toBeDisabled();
  });

  it('renders with all props', async () => {
    const component = renderComponent({
      size: 'big',
      color: SWITCH_COLOR,
      label: SWITCH_TEST_LABEL,
      disabled: true,
    });

    const switchWrapper = component.getByTestId('switch-wrapper');
    const switchInput = component.getByRole('checkbox');
    const switchLabelText = component.queryByText(SWITCH_TEST_LABEL)

    expect(switchWrapper).toHaveStyle('--switch-color: red');
    expect(switchInput).toBeDisabled();
    expect(switchLabelText).toHaveClass(CLASS_NAMES.switchLabelTextBig);

    await userEvent.click(switchInput);

    expect(switchInput).not.toBeChecked(); 
  });

  it('renders with HTML attributes', () => {
    const component = renderComponent({
      'aria-label': 'switch-label',
      type: 'checkbox',
      label: SWITCH_LABEL,
    });
    const switchInput = component.getByRole('checkbox');

    expect(switchInput).toHaveAttribute('aria-label', 'switch-label');
    expect(switchInput).toHaveAttribute('type', 'checkbox');
  });
});
