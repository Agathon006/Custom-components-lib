import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox, CheckboxProps } from './Checkbox';
import '@testing-library/jest-dom';

const CLASS_NAMES = {
  checkbox: 'checkbox',
  labelWrapper: 'label_wrapper',
  labelText: 'label_text',
};

const CHECKBOX_LABEL = 'Accept Terms and Conditions';
const ARIA_LABEL = 'checkbox-label';

describe('Checkbox', () => {
  const renderComponent = (props: Partial<CheckboxProps>) => {
    return render(<Checkbox {...props} />);
  };

  it('renders a checkbox with label', () => {
    const component = renderComponent({ label: CHECKBOX_LABEL });

    expect(component.getByText(CHECKBOX_LABEL)).toBeInTheDocument();
    expect(component.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const component = renderComponent({ className: 'my-custom-class', label: CHECKBOX_LABEL });

    expect(component.getByTestId('checkbox-wrapper')).toHaveClass('my-custom-class');
  });

  it('renders with default checkbox type', () => {
    const component = renderComponent({ label: CHECKBOX_LABEL });

    expect(component.getByRole('checkbox')).toHaveAttribute('type', 'checkbox');
  });

  it('renders with custom type (radio)', () => {
    const component = renderComponent({ label: CHECKBOX_LABEL, type: 'radio' });

    expect(component.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with label text', () => {
    const component = renderComponent({ label: CHECKBOX_LABEL });

    expect(component.getByText(CHECKBOX_LABEL)).toHaveClass(CLASS_NAMES.labelText);
  });

  it('handles onChange event', async () => {
    const onChange = jest.fn();
    const component = renderComponent({ onChange, label: CHECKBOX_LABEL });

    await userEvent.click(component.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders with disabled state', () => {
    const component = renderComponent({ disabled: true, label: CHECKBOX_LABEL });

    expect(component.getByRole('checkbox')).toBeDisabled();
  });

  it('renders with all props', async () => {
    const onChange = jest.fn();
    const checkboxProps: CheckboxProps = {
      type: 'radio',
      className: 'test-class',
      disabled: true,
      onChange: onChange,
      label: 'Test Label',
    };
    const component = renderComponent({ ...checkboxProps });
    const checkbox = component.getByRole('radio');
    const checkboxWrapper = component.getByTestId('checkbox-wrapper');

    expect(checkbox).toBeDisabled();
    expect(checkboxWrapper).toHaveClass('test-class');
    expect(component.getByText('Test Label')).toBeInTheDocument();


    await userEvent.click(checkbox);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with HTML attributes', () => {
    const component = renderComponent({
      'aria-label': ARIA_LABEL,
      label: CHECKBOX_LABEL,
    });

    expect(component.getByRole('checkbox')).toHaveAttribute('aria-label', ARIA_LABEL);
  });
});
