import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Delivery } from '../../pages/Delivery';

describe('Input Full Name', () => {
  let submitBtn: HTMLButtonElement;
  beforeEach(() => {
    render(<Delivery />);
    submitBtn = screen.getByText(/Submit/i);
  });
  it('Paste correct value', async () => {
    const input = screen.getByTestId('inputFullName');
    userEvent.type(input, 'John');
    userEvent.click(submitBtn);
    const errorMessage = await screen.findByTestId('fullNameError');
    expect(errorMessage.textContent).toHaveLength(0);
  });
  it('Paste incorrect value', async () => {
    const input = screen.getByTestId('inputFullName');
    userEvent.type(input, '123');
    userEvent.click(submitBtn);
    const errorMessage = await screen.findByTestId('fullNameError');
    expect(errorMessage.textContent).toBe('Full name must contain only alphabet English letters');
  });
});
