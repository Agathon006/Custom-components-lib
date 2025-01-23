import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, SelectProps } from './Select';
import '@testing-library/jest-dom';

const SELECT_LABEL = 'Test Label';
const SELECT_ID = 'test-select';
const SELECT_OPTIONS = {
  Option1: 'value1',
  Option2: 'value2',
  Option3: 'value3',
};
const CUSTOM_CLASS = 'custom-select-class';

describe('Select', () => {
  const renderComponent = (props: Partial<SelectProps>) => {
    return render(<Select id={SELECT_ID} {...props} />);
  };

  it('renders with default label and no options', () => {
    renderComponent({});

    expect(screen.getByText('Select...')).toBeInTheDocument();
    expect(screen.queryByText('Option1')).not.toBeInTheDocument();
  });

  it('renders with provided label', () => {
    renderComponent({ label: SELECT_LABEL });

    expect(screen.getByText(SELECT_LABEL)).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    renderComponent({ options: SELECT_OPTIONS });

    const selectElement = screen.getByRole('select');

    expect(selectElement).toBeInTheDocument();

    Object.keys(SELECT_OPTIONS).forEach(optionText => {
      expect(screen.queryByText(optionText)).not.toBeInTheDocument();
    });

    await userEvent.click(selectElement);

    Object.keys(SELECT_OPTIONS).forEach(optionText => {
      expect(screen.getByText(optionText)).toBeInTheDocument();
    });
  });

  it('renders with custom className', () => {
    renderComponent({ className: CUSTOM_CLASS });

    expect(screen.getByRole('select_wrapper')).toHaveClass(CUSTOM_CLASS);
  });

  it('opens and closes the dropdown on click', async () => {
    renderComponent({ options: SELECT_OPTIONS });

    const select = screen.getByRole('select');

    expect(screen.queryByText('Option1')).not.toBeInTheDocument();

    await userEvent.click(select);

    expect(screen.getByText('Option1')).toBeInTheDocument();

    await userEvent.click(select);

    expect(screen.queryByText('Option1')).not.toBeInTheDocument();
  });

  it('selects an option and triggers onChange', async () => {
    const onChange = jest.fn();
    renderComponent({ options: SELECT_OPTIONS, onChange });

    const select = screen.getByRole('select');

    await userEvent.click(select);

    const optionToSelect = screen.getByText('Option1');

    await userEvent.click(optionToSelect);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          id: SELECT_ID,
          value: 'value1',
        }),
      })
    );

    expect(screen.getByText('Option1')).toBeInTheDocument();
  });

    it('does not trigger onChange for disabled options', async () => {
      const onChange = jest.fn();
      renderComponent({ options: { None: '', ...SELECT_OPTIONS }, onChange });
  
      const select = screen.getByRole('select');

      await userEvent.click(select);
  
      const disabledOption = screen.getByText('None');

      await userEvent.click(disabledOption);
  
      expect(onChange).not.toHaveBeenCalled();
    });

      it('closes the dropdown when clicking outside', async () => {
        renderComponent({ options: SELECT_OPTIONS });
    
        const select = screen.getByRole('select');

        await userEvent.click(select);
    
        expect(screen.getByText('Option1')).toBeInTheDocument();
    
        await userEvent.click(document.body);
        
        expect(screen.queryByText('Option1')).not.toBeInTheDocument();
      });
});
