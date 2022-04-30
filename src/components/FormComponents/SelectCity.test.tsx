import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateMovie } from '../../pages/CreateMovie';

describe('Select city', () => {
  let submitBtn: HTMLButtonElement;
  beforeEach(() => {
    render(<CreateMovie />);
    submitBtn = screen.getByTestId('submit');
  });
  it('Try to select some city when country is unselected', async () => {
    const select: HTMLSelectElement = screen.getByTestId('selectCity');
    fireEvent.change(select, { target: { value: 'Wien' } });
    expect(select.value).not.toBe('Wien');
    expect(select.value).toBe('');
  });
  it('Select some city when country is selected', async () => {
    const selectCity: HTMLSelectElement = screen.getByTestId('selectCity');
    const selectCountry: HTMLSelectElement = screen.getByTestId('selectCountry');
    fireEvent.change(selectCountry, { target: { value: 'Austria' } });
    fireEvent.change(selectCity, { target: { value: 'Wien' } });
    expect(selectCity.value).toBe('Wien');
  });
  it("Don't select any city", async () => {
    const selectCountry = screen.getByTestId('selectCountry');
    fireEvent.change(selectCountry, { target: { value: 'Austria' } });
    userEvent.click(submitBtn);
    const errorMessage = await screen.findByTestId('cityError');
    expect(errorMessage.textContent).toBe('This field is required');
  });
});
