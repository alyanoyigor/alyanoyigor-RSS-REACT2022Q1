import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Delivery } from './Delivery';

const createCard = (
  fullName: string,
  birthday: string,
  country: string,
  city: string,
  zipCode: string
) => {
  userEvent.type(screen.getByTestId('inputFullName'), fullName);
  fireEvent.change(screen.getByTestId('inputDate'), { target: { value: birthday } });
  fireEvent.change(screen.getByTestId('selectCountry'), { target: { value: country } });
  fireEvent.change(screen.getByTestId('selectCity'), { target: { value: city } });
  userEvent.type(screen.getByTestId('zipCodeInput'), zipCode);
  fireEvent.click(screen.getByTestId('checkboxPrivacy'));
  userEvent.click(screen.getByText(/Submit/i));
};

describe('Delivery', () => {
  it('reset form after create card', async () => {
    render(<Delivery />);
    createCard('John', '2000-05-12', 'Austria', 'Wien', '12345');

    const inputFullName: HTMLInputElement = await screen.findByTestId('inputFullName');
    const inputDate: HTMLInputElement = await screen.findByTestId('inputDate');
    const selectCountry: HTMLSelectElement = await screen.findByTestId('selectCountry');
    const selectCity: HTMLSelectElement = await screen.findByTestId('selectCity');
    const zipCodeInput: HTMLInputElement = await screen.findByTestId('zipCodeInput');

    expect(inputFullName.value).toBe('');
    expect(inputDate.value).toBe('');
    expect(selectCountry.value).toBe('');
    expect(selectCity.value).toBe('');
    expect(zipCodeInput.value).toBe('');
  });
});
