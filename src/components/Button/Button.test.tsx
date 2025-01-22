import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button, ButtonProps } from './Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  const renderComponent = (props: Partial<ButtonProps>) => {
    return render(<Button {...props} />);
  };

  it('renders a button with text content', () => {
    const component = renderComponent({ children: 'Click me' });

    expect(component.getByRole('button')).toHaveTextContent('Click me');
  });

  it('renders with custom className', () => {
    const component = renderComponent({ className: 'my-custom-class', children: 'Click me' });

    expect(component.getByRole('button')).toHaveClass('my-custom-class');
  });

  it('renders with default size medium', () => {
    const component = renderComponent({ children: 'Click me' });

    expect(component.getByRole('button')).not.toHaveClass('button-small');
    expect(component.getByRole('button')).not.toHaveClass('button-big');
  });

  it('renders with size small', () => {
    const component = renderComponent({ size: 'small', children: 'Click me' });

    expect(component.getByRole('button')).toHaveClass('button-small');
  });

  it('renders with size big', () => {
    const component = renderComponent({ size: 'big', children: 'Click me' });

    expect(component.getByRole('button')).toHaveClass('button-big');
  });

  it('renders with default variant contained', () => {
    const component = renderComponent({ children: 'Click me' });

    expect(component.getByRole('button')).not.toHaveClass('button-text');
    expect(component.getByRole('button')).not.toHaveClass('button-outlined');
  });

  it('renders with variant text', () => {
    const component = renderComponent({ variant: 'text', children: 'Click me' });

    expect(component.getByRole('button')).toHaveClass('button-text');
  });

  it('renders with variant outlined', () => {
    const component = renderComponent({ variant: 'outlined', children: 'Click me' });

    expect(component.getByRole('button')).toHaveClass('button-outlined');
  });

  it('handles onClick event', () => {
    const onClick = jest.fn();
    const component = renderComponent({ onClick, children: 'Click me' });

    fireEvent.click(component.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with disabled state', () => {
    const component = renderComponent({ disabled: true, children: 'Click me' });

    expect(component.getByRole('button')).toBeDisabled();
  });

  it('renders with all props', () => {
    const onClick = jest.fn();
    const buttonProps: ButtonProps = {
      size: 'big',
      variant: 'outlined',
      className: 'test-class',
      onClick: onClick,
      disabled: true,
    };
    const component = renderComponent({ ...buttonProps, children: 'Test' });
    const button = component.getByRole('button');

    expect(button).toHaveTextContent('Test');
    expect(button).toHaveClass('button-big');
    expect(button).toHaveClass('button-outlined');
    expect(button).toHaveClass('test-class');
    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders with HTML attributes', () => {
    const component = renderComponent({
      'aria-label': 'test-button',
      type: 'submit',
      children: 'Click me',
    });
    const button = component.getByRole('button');
    
    expect(button).toHaveAttribute('aria-label', 'test-button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
