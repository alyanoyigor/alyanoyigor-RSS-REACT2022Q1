import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Delivery } from '../../index';

describe('Select country', () => {
  let submitBtn: HTMLButtonElement;
  beforeEach(() => {
    render(<Delivery />);
    submitBtn = screen.getByText(/Submit/i);
  });
  it('Select some country', async () => {
    const select = screen.getByTestId('selectCountry');
    fireEvent.change(select, { target: { value: 'Ukraine' } });
    expect(screen.getByTestId('selectCountry')).toContainHTML('Ukraine');
    userEvent.click(submitBtn);
    const errorMessage = await screen.findByTestId('countryError');
    expect(errorMessage.textContent).toHaveLength(0);
  });
  it("Don't select any country", async () => {
    const input = screen.getByTestId('inputFullName');
    fireEvent.change(input, { target: { value: 'Test' } });
    userEvent.click(submitBtn);
    const errorMessage = await screen.findByTestId('countryError');
    expect(errorMessage.textContent).toBe('This field is required');
  });
});
