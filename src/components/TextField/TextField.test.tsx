import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField, TextFieldProps } from './TextField';
import '@testing-library/jest-dom';

const CLASS_NAMES = {
  textField: 'text_field',
  textFieldOutlined: 'text_field_outlined',
  textFieldFilled: 'text_field_filled',
  textFieldStandard: 'text_field_standard',
  labelText: 'label_text',
  error: 'error',
  errorText: 'error_text',
};

const PLACEHOLDER_TEXT = 'Enter text';
const ERROR_TEXT = 'Error occurred';
const LABEL_TEXT = 'Test Label';

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

    expect(input).toHaveClass(CLASS_NAMES.textField);
    expect(input).toHaveClass(CLASS_NAMES.textFieldOutlined);
  });

  it('renders with variant filled', () => {
    const component = renderComponent({ id: 'test-id', variant: 'filled' });
    const input = component.getByRole('textbox');

    expect(input).toHaveClass(CLASS_NAMES.textFieldFilled);
  });

  it('renders with variant standard', () => {
    const component = renderComponent({ id: 'test-id', variant: 'standard' });
    const input = component.getByRole('textbox');

    expect(input).toHaveClass(CLASS_NAMES.textFieldStandard);
  });

  it('renders with custom className', () => {
    const component = renderComponent({ id: 'test-id', className: 'custom-class' });
    const input = component.getByRole('textbox');

    expect(input).toHaveClass('custom-class');
  });

  it('renders with label', () => {
    const component = renderComponent({ id: 'test-id', label: LABEL_TEXT });

    expect(component.getByText(LABEL_TEXT)).toHaveClass(CLASS_NAMES.labelText);
  });

  it('renders with error state', () => {
    const component = renderComponent({ id: 'test-id', error: true });
    const input = component.getByRole('textbox');

    expect(input).toHaveClass(CLASS_NAMES.error);
  });

  it('renders with errorText', () => {
    const component = renderComponent({ id: 'test-id', errorText: ERROR_TEXT });

    expect(component.getByText(ERROR_TEXT)).toHaveClass(CLASS_NAMES.errorText);
  });

  it('renders with placeholder', () => {
    const component = renderComponent({ id: 'test-id', placeholder: PLACEHOLDER_TEXT });
    const input = component.getByRole('textbox');

    expect(input).toHaveAttribute('placeholder', PLACEHOLDER_TEXT);
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

    expect(input).toHaveClass(CLASS_NAMES.textField);
    expect(input).toHaveClass(CLASS_NAMES.textFieldFilled);
    expect(input).toHaveClass('custom-class');
    expect(input).toHaveAttribute('placeholder', 'Placeholder');
    expect(input).toBeRequired();
    expect(input).toHaveValue('Value');
    expect(component.getByText('Label')).toHaveClass(CLASS_NAMES.labelText);
    expect(component.getByText('Error')).toHaveClass(CLASS_NAMES.errorText);

    await user.type(input, 'New value');

    expect(onChange).toHaveBeenCalledTimes(9);
  });
});
