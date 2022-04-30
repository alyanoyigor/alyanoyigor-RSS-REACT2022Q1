import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateMovie } from './CreateMovie';

const createCard = (title: string, date: string, country: string, city: string, amount: string) => {
  userEvent.type(screen.getByTestId('inputTitle'), title);
  fireEvent.change(screen.getByTestId('inputDate'), { target: { value: date } });
  fireEvent.click(screen.getAllByTestId('inputRadio')[0]);
  fireEvent.change(screen.getByTestId('selectCountry'), { target: { value: country } });
  fireEvent.change(screen.getByTestId('selectCity'), { target: { value: city } });
  userEvent.type(screen.getByTestId('inputAmount'), amount);
  fireEvent.click(screen.getByTestId('checkboxPrivacy'));
  userEvent.click(screen.getByTestId('submit'));
};

describe('Delivery', () => {
  it('reset form after create card', async () => {
    render(<CreateMovie />);
    createCard('Spider Man', '2010-05-12', 'Austria', 'Wien', '12345');

    await waitFor(() => {
      const inputFullName: HTMLInputElement = screen.getByTestId('inputTitle');
      const inputDate: HTMLInputElement = screen.getByTestId('inputDate');
      const selectCountry: HTMLSelectElement = screen.getByTestId('selectCountry');
      const selectCity: HTMLSelectElement = screen.getByTestId('selectCity');
      const inputAmount: HTMLInputElement = screen.getByTestId('inputAmount');

      expect(inputFullName.value).toBe('');
      expect(inputDate.value).toBe('');
      expect(selectCountry.value).toBe('');
      expect(selectCity.value).toBe('');
      expect(inputAmount.value).toBe('');
    });
  });
});
