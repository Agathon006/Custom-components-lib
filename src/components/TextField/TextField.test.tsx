import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField, TextFieldProps } from './TextField';
import '@testing-library/jest-dom';

describe('TextField', () => {
  const defaultProps: TextFieldProps = {
    id: 'test-input',
    onChange: jest.fn(),
  };

  const renderComponent = (props: Partial<TextFieldProps> = {}) => {
    return render(<TextField {...defaultProps} {...props} />);
  };

  it('renders with default variant outlined', () => {
    const component = renderComponent({ id: 'test-id' });
    const input = component.getByRole('textbox');

    expect(input).toHaveClass('text_field');
    expect(input).toHaveClass('text_field_outlined');
  });

  it('renders with variant filled', () => {
    const component = renderComponent({ id: 'test-id', variant: 'filled' });
    const input = component.getByRole('textbox');

    expect(input).toHaveClass('text_field_filled');
  });

  it('renders with variant standard', () => {
    const component = renderComponent({ id: 'test-id', variant: 'standard' });
    const input = component.getByRole('textbox');

    expect(input).toHaveClass('text_field_standard');
  });

  it('renders with custom className', () => {
    const component = renderComponent({ id: 'test-id', className: 'custom-class' });
    const input = component.getByRole('textbox');

    expect(input).toHaveClass('custom-class');
  });

  it('renders with label', () => {
    const component = renderComponent({ id: 'test-id', label: 'Test Label' });

    expect(component.getByText('Test Label')).toHaveClass('label_text');
  });

  it('renders with error state', () => {
    const component = renderComponent({ id: 'test-id', error: true });
    const input = component.getByRole('textbox');

    expect(input).toHaveClass('error');
  });

  it('renders with errorText', () => {
    const component = renderComponent({ id: 'test-id', errorText: 'Error occurred' });

    expect(component.getByText('Error occurred')).toHaveClass('error_text');
  });

  it('renders with placeholder', () => {
    const component = renderComponent({ id: 'test-id', placeholder: 'Enter text' });
    const input = component.getByRole('textbox');

    expect(input).toHaveAttribute('placeholder', 'Enter text');
  });

  it('handles onChange event', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const component = renderComponent({ id: 'test-id', onChange });
    const input = component.getByRole('textbox');

    await user.type(input, 'New value');

    expect(onChange).toHaveBeenCalledTimes(9);
    const event = onChange.mock.calls[7][0];
    expect(event.target.value).toBe('New value');
  });

  it('renders with required attribute', () => {
    const component = renderComponent({ id: 'test-id', required: true });
    const input = component.getByRole('textbox');

    expect(input).toBeRequired();
  });

  it('renders with value', () => {
    const component = renderComponent({ id: 'test-id', value: 'Initial value' });
    const input = component.getByRole('textbox');

    expect(input).toHaveValue('Initial value');
  });

  it('renders with all props', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const textFieldProps: TextFieldProps = {
      id: 'test-id',
      label: 'Label',
      errorText: 'Error',
      type: 'text',
      variant: 'filled',
      className: 'custom-class',
      placeholder: 'Placeholder',
      required: true,
      error: true,
      value: 'Value',
      onChange,
    };
    const component = renderComponent(textFieldProps);
    const input = component.getByRole('textbox');

    expect(input).toHaveClass('text_field');
    expect(input).toHaveClass('text_field_filled');
    expect(input).toHaveClass('custom-class');
    expect(input).toHaveAttribute('placeholder', 'Placeholder');
    expect(input).toBeRequired();
    expect(input).toHaveValue('Value');
    expect(component.getByText('Label')).toHaveClass('label_text');
    expect(component.getByText('Error')).toHaveClass('error_text');

    await user.type(input, 'New value');

    expect(onChange).toHaveBeenCalledTimes(9);
  });
});