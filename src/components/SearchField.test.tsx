import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchField } from './SearchField';
import SearchIcon from '../assets/svg/search.svg';
import '@testing-library/jest-dom';

describe('Search', () => {
  it('Render search', () => {
    render(<SearchField onChangeMoviesList={() => {}} />);
    const input: HTMLInputElement = screen.getByRole('search');
    expect(input).toBeInTheDocument();
    expect(input).toHaveStyle({ backgroundImage: `url(${SearchIcon})` });
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(input).toContainHTML('Test');
  });
});
