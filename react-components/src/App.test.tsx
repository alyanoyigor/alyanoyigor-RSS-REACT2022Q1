import React from 'react';
import App from './App';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './test/helper/renderWithRouter';
import { LocalStorageMock } from './test/mock/localeStorageMock';

describe('App', () => {
  it('Start app with correct elements', async () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('home-title')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect((await screen.findAllByTestId('card-item'))[0]).toBeInTheDocument();
  });

  it('Save input value after switching between pages', () => {
    renderWithRouter(<App />);
    const input: HTMLInputElement = screen.getByRole('search');
    const homeLink = screen.getByTestId('home-link');
    const aboutLink = screen.getByTestId('about-link');

    fireEvent.change(input, { target: { value: 'Test' } });
    userEvent.click(aboutLink);
    userEvent.click(homeLink);

    expect(input).toContainHTML('Test');
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

describe('Local Storage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() });
  });

  it('Save to localStorage value from input before switching between pages', () => {
    renderWithRouter(<App />);
    const input: HTMLInputElement = screen.getByRole('search');
    const homeLink = screen.getByTestId('home-link');
    const aboutLink = screen.getByTestId('about-link');

    fireEvent.change(input, { target: { value: 'Test' } });
    userEvent.click(aboutLink);
    userEvent.click(homeLink);

    expect(localStorage.getItem('searchValue')).toBe('Test');
  });
});
