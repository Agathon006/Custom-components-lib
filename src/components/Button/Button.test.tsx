import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, ButtonProps } from './Button';
import '@testing-library/jest-dom';

const CLASS_NAMES = {
  buttonMedium: 'button_medium',
  buttonContained: 'button_contained',
  buttonSmall: 'button_small',
  buttonBig: 'button_big',
  buttonText: 'button_text',
  buttonOutlined: 'button_outlined',
};

const BUTTON_TEXT = 'Click me';
const BUTTON_TEST_TEXT = 'Test';
const ARIA_LABEL = 'test-button';
const BUTTON_TYPE = 'submit';

describe('Button', () => {
  const renderComponent = (props: Partial<ButtonProps>) => {
    return render(<Button {...props} />);
  };

  it('renders a button with text content', () => {
    const component = renderComponent({ children: BUTTON_TEXT });

    expect(component.getByRole('button')).toHaveTextContent(BUTTON_TEXT);
  });

  it('renders with custom className', () => {
    const component = renderComponent({ className: 'my-custom-class', children: BUTTON_TEXT });

    expect(component.getByRole('button')).toHaveClass('my-custom-class');
  });

  it('renders a default medium contained button with no provided prop variant', () => {
    const component = renderComponent({ children: BUTTON_TEXT });

    expect(component.getByRole('button')).toHaveClass(CLASS_NAMES.buttonMedium);
    expect(component.getByRole('button')).toHaveClass(CLASS_NAMES.buttonContained);
  });

  it('renders with size small', () => {
    const component = renderComponent({ size: 'small', children: BUTTON_TEXT });

    expect(component.getByRole('button')).toHaveClass(CLASS_NAMES.buttonSmall);
  });

  it('renders with size big', () => {
    const component = renderComponent({ size: 'big', children: BUTTON_TEXT });

    expect(component.getByRole('button')).toHaveClass(CLASS_NAMES.buttonBig);
  });

  it('renders with default variant contained', () => {
    const component = renderComponent({ children: BUTTON_TEXT });

    expect(component.getByRole('button')).not.toHaveClass(CLASS_NAMES.buttonText);
    expect(component.getByRole('button')).not.toHaveClass(CLASS_NAMES.buttonOutlined);
  });

  it('renders with variant text', () => {
    const component = renderComponent({ variant: 'text', children: BUTTON_TEXT });

    expect(component.getByRole('button')).toHaveClass(CLASS_NAMES.buttonText);
  });

  it('renders with variant outlined', () => {
    const component = renderComponent({ variant: 'outlined', children: BUTTON_TEXT });

    expect(component.getByRole('button')).toHaveClass(CLASS_NAMES.buttonOutlined);
  });

  it('handles onClick event', async () => {
    const onClick = jest.fn();
    const component = renderComponent({ onClick, children: BUTTON_TEXT });

    await userEvent.click(component.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with disabled state', () => {
    const component = renderComponent({ disabled: true, children: BUTTON_TEXT });

    expect(component.getByRole('button')).toBeDisabled();
  });

  it('renders with all props', async () => {
    const onClick = jest.fn();
    const buttonProps: ButtonProps = {
      size: 'big',
      variant: 'outlined',
      className: 'test-class',
      onClick: onClick,
      disabled: true,
    };
    const component = renderComponent({ ...buttonProps, children: BUTTON_TEST_TEXT });
    const button = component.getByRole('button');

    expect(button).toHaveTextContent(BUTTON_TEST_TEXT);
    expect(button).toHaveClass(CLASS_NAMES.buttonBig);
    expect(button).toHaveClass(CLASS_NAMES.buttonOutlined);
    expect(button).toHaveClass('test-class');
    expect(button).toBeDisabled();

    await userEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders with HTML attributes', () => {
    const component = renderComponent({
      'aria-label': ARIA_LABEL,
      type: BUTTON_TYPE,
      children: BUTTON_TEXT,
    });
    const button = component.getByRole('button');

    expect(button).toHaveAttribute('aria-label', ARIA_LABEL);
    expect(button).toHaveAttribute('type', BUTTON_TYPE);
  });
});
