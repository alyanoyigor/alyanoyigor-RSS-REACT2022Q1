import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Search } from './Search';
import SearchIcon from '../assets/svg/search.svg';
import '@testing-library/jest-dom';

describe('Search', () => {
  it('Render search', () => {
    render(<Search />);
    const input: HTMLInputElement = screen.getByRole('search');
    expect(input).toBeInTheDocument();
    expect(input).toHaveStyle({ backgroundImage: `url(${SearchIcon})` });
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(input).toContainHTML('Test');
  });
});
