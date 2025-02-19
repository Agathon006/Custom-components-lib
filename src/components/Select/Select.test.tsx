import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, SelectProps } from './Select';
import '@testing-library/jest-dom';

const SELECT_LABEL = 'Test Label';
const SELECT_ID = 'test-select';
const SELECT_OPTIONS = [
  { id: 'text1', label: 'Text 1' },
  { id: 'text2', label: 'Text 2sssssssssssssssssssssssssssssssssssssssssss' },
  { id: 'text3', label: 'Text 3' },
];
const CUSTOM_CLASS = 'custom-select-class';

describe('Select', () => {
  const renderComponent = (props: Partial<SelectProps>) => {
    return render(<Select id={SELECT_ID} {...props} />);
  };

  it('renders with provided label', () => {
    renderComponent({ label: SELECT_LABEL });

    expect(screen.getByText(SELECT_LABEL)).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    renderComponent({ options: SELECT_OPTIONS });

    const selectElement = screen.getByRole('combobox');

    await userEvent.click(selectElement);

    SELECT_OPTIONS.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('renders with custom className', () => {
    renderComponent({ className: CUSTOM_CLASS });

    expect(screen.getByTestId('select-wrapper')).toHaveClass(CUSTOM_CLASS);
  });

  it('selects an option and triggers onChange', async () => {
    const onChange = jest.fn();
    renderComponent({ options: SELECT_OPTIONS, onChange });

    const select = screen.getByRole('combobox');
    await userEvent.click(select);

    const optionToSelect = screen.getByText('Text 1');
    await userEvent.click(optionToSelect);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.stringContaining('text1'));
  });
});
