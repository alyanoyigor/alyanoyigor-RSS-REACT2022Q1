import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchField } from './SearchField';
import SearchIcon from '../assets/svg/search.svg';
import '@testing-library/jest-dom';

describe('Search', () => {
  it('Render search', async () => {
    render(<SearchField onSubmitMovie={() => {}} />);
    const input: HTMLInputElement = screen.getByRole('search');
    expect(input).toBeInTheDocument();
    expect(input).toHaveStyle({ backgroundImage: `url(${SearchIcon})` });
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(input.value).toBe('Test');
  });
  it('press enter in input', () => {
    const handleSearch = jest.fn();
    const { getByRole } = render(<SearchField onSubmitMovie={handleSearch} />);
    const input = getByRole('search');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
  it('press not enter in input', () => {
    const handleSearch = jest.fn();
    const { getByRole } = render(<SearchField onSubmitMovie={handleSearch} />);
    const input = getByRole('search');
    fireEvent.keyDown(input, { key: 'A', code: 'KeyA' });
    fireEvent.keyDown(input, { key: 'Space', code: 'Space' });
    expect(handleSearch).toHaveBeenCalledTimes(0);
  });
});
