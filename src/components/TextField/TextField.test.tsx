import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TextField, TextFieldProps } from './TextField';
import '@testing-library/jest-dom';

describe('TextField', () => {
  const defaultProps: TextFieldProps = {
    id: 'test-input',
  };

  const renderComponent = (props: Partial<TextFieldProps> = {}) => {
    return render(<TextField {...defaultProps} {...props} />);
  };

  it('should render without errors', () => {
    const component = renderComponent();
    expect(component.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render with the correct ID', () => {
    const component = renderComponent({ id: 'custom-id' });
    expect(component.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
  });

  it('should not render label when not provided', () => {
    const component = renderComponent();
    expect(component.queryByRole('textbox', { name: 'undefined' })).not.toBeInTheDocument();
  });

  it('should render error text correctly when provided', () => {
    const component = renderComponent({ errorText: 'Test Error Text' });
    expect(component.getByText('Test Error Text')).toBeInTheDocument();
  });

  it('should not render error text when not provided', () => {
    const component = renderComponent();
    expect(component.queryByText('Test Error Text')).not.toBeInTheDocument();
  });

  it('should apply correct classes for different variants', () => {
    const component = renderComponent({ variant: 'outlined' });
    expect(component.getByRole('textbox')).toHaveClass('text-field-outlined');
  });

  it('should apply error class when error prop is true', () => {
    const component = renderComponent({ error: true });
    expect(component.getByRole('textbox')).toHaveClass('error');
  });

  it('should not apply error class when error prop is false', () => {
    const component = renderComponent({ error: false });
    expect(component.getByRole('textbox')).not.toHaveClass('error');
  });

  it('should apply custom className', () => {
    const component = renderComponent({ className: 'custom-class' });
    expect(component.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('should have correct type attribute', () => {
    const component = renderComponent({ type: 'textbox' });
    expect(component.getByRole('textbox')).toHaveAttribute('type', 'textbox');
  });

  it('should have default type attribute text', () => {
    const component = renderComponent();
    expect(component.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('should have placeholder attribute', () => {
    const component = renderComponent({ placeholder: 'Enter your name' });
    expect(component.getByRole('textbox')).toHaveAttribute('placeholder', 'Enter your name');
  });

  it('should set label-focused class when input is focused', () => {
    const component = renderComponent({ label: 'Test Label' });
    const inputElement = component.getByRole('textbox');
    fireEvent.focus(inputElement);
    expect(component.getByText('Test Label')).toHaveClass('label-focused');
  });

  it('should remove label-focused class when input is blurred', () => {
    const component = renderComponent({ label: 'Test Label' });
    const inputElement = component.getByRole('textbox');
    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);
    expect(component.getByText('Test Label')).not.toHaveClass('label-focused');
  });

  it('should update value when input changes', () => {
    const onChange = jest.fn();
    const component = renderComponent({ label: 'Test Label', value: 'initial value', onChange });
    const inputElement = component.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('should render with a controlled value', () => {
    const component = renderComponent({ value: 'controlled value' });
    expect((component.getByRole('textbox') as HTMLInputElement).value).toBe('controlled value');
  });
});
