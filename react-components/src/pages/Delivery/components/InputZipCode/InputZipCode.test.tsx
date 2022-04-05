import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Delivery } from '../../index';

describe('Zip code', () => {
  let submitBtn: HTMLButtonElement;
  beforeEach(() => {
    render(<Delivery />);
    submitBtn = screen.getByText(/Submit/i);
  });
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
