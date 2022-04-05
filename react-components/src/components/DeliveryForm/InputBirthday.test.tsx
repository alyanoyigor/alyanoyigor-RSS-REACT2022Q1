import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Delivery } from '../../pages/Delivery';

describe('Input Date', () => {
  let submitBtn: HTMLButtonElement;
  beforeEach(() => {
    render(<Delivery />);
    submitBtn = screen.getByText(/Submit/i);
  });

  it('Paste correct date', async () => {
    const input = screen.getByTestId('inputDate');
    fireEvent.change(input, { target: { value: '2000-05-12' } });
    userEvent.click(submitBtn);
    const errorMessage = await screen.findByTestId('dateError');
    expect(errorMessage.textContent).toHaveLength(0);
  });
  it('Paste incorrect date', async () => {
    const input = screen.getByTestId('inputDate');
    fireEvent.change(input, { target: { value: '2020-05-12' } });
    userEvent.click(submitBtn);
    const errorMessage = await screen.findByTestId('dateError');
    expect(errorMessage.textContent).toBe('Sorry, but you must be over 18 years old');
  });
});
