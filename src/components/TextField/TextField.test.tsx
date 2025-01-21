import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextField, TextFieldProps } from './TextField';
import '@testing-library/jest-dom';

describe('TextField', () => {
  const defaultProps: TextFieldProps = {
    id: 'test-input',
  };

  const renderComponent = (props: Partial<TextFieldProps> = {}) => {
    render(<TextField {...defaultProps} {...props} />);
  };

  it('should render without errors', () => {
    renderComponent();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render with the correct ID', () => {
    renderComponent({ id: 'custom-id' });
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
  });

  it('should not render label when not provided', () => {
    renderComponent();
    expect(screen.queryByRole('textbox', { name: 'undefined' })).not.toBeInTheDocument();
  });

  it('should render helper text correctly when provided', () => {
    renderComponent({ helperText: 'Test Helper Text' });
    expect(screen.getByText('Test Helper Text')).toBeInTheDocument();
  });

  it('should not render helper text when not provided', () => {
    renderComponent();
    expect(screen.queryByText('Test Helper Text')).not.toBeInTheDocument();
  });

  it('should apply correct classes for different variants', () => {
    renderComponent({ variant: 'outlined' });
    expect(screen.getByRole('textbox')).toHaveClass('text-field-outlined');
  });

  it('should apply error class when error prop is true', () => {
    renderComponent({ error: true });
    expect(screen.getByRole('textbox')).toHaveClass('error');
    if (screen.queryByText('Test Label')) {
      expect(screen.getByText('Test Label')).toHaveClass('error');
    }

    if (screen.queryByText('Test Helper Text')) {
      expect(screen.getByText('Test Helper Text')).toHaveClass('error');
    }
  });

  it('should not apply error class when error prop is false', () => {
    renderComponent({ error: false });
    expect(screen.getByRole('textbox')).not.toHaveClass('error');
  });

  it('should apply custom className', () => {
    renderComponent({ className: 'custom-class' });
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('should have correct type attribute', () => {
    renderComponent({ type: 'textbox' });
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'textbox');
  });
  it('should have default type attribute text', () => {
    renderComponent();
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('should have placeholder attribute', () => {
    renderComponent({ placeholder: 'Enter your name' });
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Enter your name');
  });

  it('should set isFocused state on focus', () => {
    renderComponent({ label: 'Test Label' });
    const inputElement = screen.getByRole('textbox');
    fireEvent.focus(inputElement);
    expect(screen.getByText('Test Label')).toHaveClass('label-focused');
  });

  it('should remove isFocused state on blur', () => {
    renderComponent({ label: 'Test Label' });
    const inputElement = screen.getByRole('textbox');
    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);
    expect(screen.getByText('Test Label')).not.toHaveClass('label-focused');
  });

  it('should set hasValue state on input change', () => {
    renderComponent({ label: 'Test Label' });
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(screen.getByText('Test Label')).toHaveClass('label-focused');
  });

  it('should set hasValue state when defaultValue is provided', () => {
    renderComponent({ label: 'Test Label', defaultValue: 'initial value' });
    expect(screen.getByText('Test Label')).toHaveClass('label-focused');
  });

  it('should render with a defaultValue', () => {
    renderComponent({ defaultValue: 'initial value' });
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('initial value');
  });

  it('should not set hasValue when input is cleared', () => {
    renderComponent({ label: 'Test Label', defaultValue: 'initial value' });
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '' } });
    expect(screen.getByText('Test Label')).not.toHaveClass('label-focused');
  });
});
