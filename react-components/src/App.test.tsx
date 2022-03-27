import React from 'react';
import App from './App';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './test/helper/renderWithRouter';

describe('App', () => {
  it('Start app with correct elements', async () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('home-title')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect((await screen.findAllByTestId('card-item'))[0]).toBeInTheDocument();
  });

  it('Check localStorage value after switch pages', () => {
    renderWithRouter(<App />);
    const input: HTMLInputElement = screen.getByRole('search');
    const homeLink = screen.getByTestId('home-link');
    const aboutLink = screen.getByTestId('about-link');

    fireEvent.change(input, { target: { value: 'Test' } });
    const searchValue = localStorage.getItem('searchValue');
    expect(searchValue).toBe('Test');

    userEvent.click(aboutLink);
    expect(screen.getByTestId('about-title')).toBeInTheDocument();
    userEvent.click(homeLink);

    expect(screen.getByTestId('home-title')).toBeInTheDocument();
    expect(screen.getByRole('search')).toContainHTML('Test');
  });

  it('Switch between pages', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByTestId('home-link');
    const aboutLink = screen.getByTestId('about-link');
    userEvent.click(aboutLink);
    expect(screen.getByTestId('about-title')).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(screen.getByTestId('home-title')).toBeInTheDocument();
  });
});
