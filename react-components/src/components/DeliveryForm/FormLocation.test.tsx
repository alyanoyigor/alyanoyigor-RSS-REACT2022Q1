import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Delivery } from '../../pages/Delivery';

describe('FormLocation', () => {
  let submitBtn: HTMLButtonElement;
  beforeEach(() => {
    render(<Delivery />);
    submitBtn = screen.getByText(/Submit/i);
  });
  describe('Select country', () => {
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
  describe('Select city', () => {
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
  describe('Zip code', () => {
    it('Paste string value', () => {
      const input: HTMLInputElement = screen.getByTestId('zipCodeInput');
      userEvent.type(input, 'Test');
      expect(input.value).not.toBe('Test');
      expect(input.value).toBe('');
    });
    it('Paste number value', () => {
      const input: HTMLInputElement = screen.getByTestId('zipCodeInput');
      userEvent.type(input, '123');
      expect(input.value).toBe('123');
    });
    it('Paste less than 5 digits', async () => {
      const input: HTMLInputElement = screen.getByTestId('zipCodeInput');
      userEvent.type(input, '123');
      userEvent.click(submitBtn);
      const errorMessage = await screen.findByTestId('zipCodeError');
      expect(errorMessage.textContent).toBe('Number must be 5 digits');
    });
    it('Paste more than 5 digits', async () => {
      const input: HTMLInputElement = screen.getByTestId('zipCodeInput');
      userEvent.type(input, '123456');
      userEvent.click(submitBtn);
      const errorMessage = await screen.findByTestId('zipCodeError');
      expect(errorMessage.textContent).toBe('Number must be 5 digits');
    });
    it('Paste 5 digits', async () => {
      const input: HTMLInputElement = screen.getByTestId('zipCodeInput');
      userEvent.type(input, '12345');
      userEvent.click(submitBtn);
      const errorMessage = await screen.findByTestId('zipCodeError');
      expect(errorMessage.textContent).toBe('');
    });
  });
});
