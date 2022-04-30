import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateMovie } from '../../pages/CreateMovie';

describe('Select country', () => {
  let submitBtn: HTMLButtonElement;

  beforeEach(() => {
    render(<CreateMovie />);
    submitBtn = screen.getByTestId('submit');
  });
  it('Select some country', async () => {
    const select = screen.getByTestId('selectCountry');
    fireEvent.change(select, { target: { value: 'Ukraine' } });
    expect(screen.getByTestId('selectCountry')).toContainHTML('Ukraine');
    userEvent.click(submitBtn);
    const errorMessage = screen.queryByTestId('countryError');
    expect(errorMessage).not.toBeInTheDocument();
  });
  it("Don't select any country", async () => {
    const input = screen.getByTestId('inputTitle');
    fireEvent.change(input, { target: { value: 'Test' } });
    userEvent.click(submitBtn);
    const errorMessage = await screen.findByTestId('countryError');
    expect(errorMessage.textContent).toBe('This field is required');
  });
});
