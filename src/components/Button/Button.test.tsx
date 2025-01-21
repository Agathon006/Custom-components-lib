import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, ButtonProps } from './Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders a button with text content', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('renders with custom className', () => {
    render(<Button className="my-custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('my-custom-class');
  });

  it('renders with default size medium', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('button-small');
    expect(screen.getByRole('button')).not.toHaveClass('button-big');
  });

  it('renders with size small', () => {
    render(<Button size="small">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button-small');
  });

  it('renders with size big', () => {
    render(<Button size="big">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button-big');
  });

  it('renders with default variant contained', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('button-text');
    expect(screen.getByRole('button')).not.toHaveClass('button-outlined');
  });

  it('renders with variant text', () => {
    render(<Button variant="text">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button-text');
  });

  it('renders with variant outlined', () => {
    render(<Button variant="outlined">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button-outlined');
  });

  it('handles onClick event', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with disabled state', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
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
    render(<Button {...buttonProps}>Test</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Test');
    expect(button).toHaveClass('button-big');
    expect(button).toHaveClass('button-outlined');
    expect(button).toHaveClass('test-class');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders with HTML attributes', () => {
    render(
      <Button aria-label="test-button" type="submit">
        Click me
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'test-button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
