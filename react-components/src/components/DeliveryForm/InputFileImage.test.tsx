import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Delivery } from '../../pages/Delivery';

describe('Input File', () => {
  let submitBtn: HTMLButtonElement;
  beforeEach(() => {
    render(<Delivery />);
    submitBtn = screen.getByText(/Submit/i);
  });
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
