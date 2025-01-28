import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch, SwitchProps } from './Switch';
import '@testing-library/jest-dom';

describe('Switch', () => {
  const renderComponent = (props: Partial<SwitchProps>) => {
    return render(<Switch {...props} />);
  };

});
