import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeliveryForm } from '../../pages/DeliveryForm';

describe('FormPersonalInfo', () => {
  let submitBtn: HTMLButtonElement;
  beforeEach(() => {
    render(<DeliveryForm />);
    submitBtn = screen.getByText(/Submit/i);
  });
  describe('Input Full Name', () => {
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
  describe('Input Date', () => {
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
  describe('Input File', () => {
    it('Uploaded file exist', async () => {
      const file = new File(['blob'], 'test.png', { type: 'image/png' });
      await waitFor(() =>
        fireEvent.change(screen.getByTestId('inputFile'), {
          target: { files: [file] },
        })
      );
      const input: HTMLInputElement = screen.getByTestId('inputFile');
      if (input.files) {
        expect(input.files[0].name).toBe('test.png');
        expect(input.files.length).toBe(1);
      }
    });
    it('Upload png file', async () => {
      const file = new File(['blob'], 'test.png', { type: 'image/png' });
      const input = screen.getByTestId('inputFile');
      await waitFor(() =>
        fireEvent.change(input, {
          target: { files: [file] },
        })
      );
      userEvent.click(submitBtn);
      const errorMessage = await screen.findByTestId('fileError');
      expect(errorMessage.textContent).toHaveLength(0);
    });
    it('Upload pdf file', async () => {
      const file = new File(['blob'], 'test.pdf', { type: 'application/pdf' });
      const input = screen.getByTestId('inputFile');
      await waitFor(() =>
        fireEvent.change(input, {
          target: { files: [file] },
        })
      );
      userEvent.click(submitBtn);
      const errorMessage = await screen.findByTestId('fileError');
      expect(errorMessage.textContent).toBe('Image must be in png, jpeg or gif format');
    });
  });
});
