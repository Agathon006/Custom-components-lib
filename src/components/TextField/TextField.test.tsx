import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextField, TextFieldProps } from '.';
import '@testing-library/jest-dom';

describe('TextField', () => {
  const defaultProps: TextFieldProps = {
    id: 'test-id',
  };

  it('renders input with correct id', () => {
    render(<TextField {...defaultProps} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-id');
  });

  it('renders with a label', () => {
    const labelText = 'Test Label';
    render(<TextField {...defaultProps} label={labelText} />);
    expect(screen.getByLabelText(labelText)).toBeInTheDocument();
  });

  it('renders input with specified type', () => {
    render(<TextField {...defaultProps} type="textbox" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'textbox');
  });

  it('renders input with correct variant class', () => {
    render(<TextField {...defaultProps} variant="filled" />);
    expect(screen.getByRole('textbox')).toHaveClass('textField-filled');
  });

  it('renders with additional classname', () => {
    const additionalClass = 'my-custom-class';
    render(<TextField {...defaultProps} className={additionalClass} />);
    expect(screen.getByRole('textbox')).toHaveClass(additionalClass);
  });

  it('renders input with a placeholder', () => {
    const placeholderText = 'Enter text here';
    render(<TextField {...defaultProps} placeholder={placeholderText} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', placeholderText);
  });

  it('renders input with required attribute', () => {
    render(<TextField {...defaultProps} required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('renders with error styling when error prop is true', () => {
    render(<TextField {...defaultProps} error={true} />);
    expect(screen.getByRole('textbox')).toHaveClass('textField-error');
  });

  it('renders helper text', () => {
    const helperText = 'This is helper text';
    render(<TextField {...defaultProps} helperText={helperText} />);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('renders helper text with error styling when error prop is true', () => {
    const helperText = 'Error helper text';
    render(<TextField {...defaultProps} helperText={helperText} error={true} />);
    expect(screen.getByText(helperText)).toHaveClass('textField-error');
  });

  it('allows value to be changed', () => {
    render(<TextField {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(input).toHaveValue('test value');
  });

  it('passes down other props to the input element', () => {
    const dataTestId = 'custom-data-test-id';
    render(<TextField {...defaultProps} data-testid={dataTestId} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('data-testid', dataTestId);
  });
});
