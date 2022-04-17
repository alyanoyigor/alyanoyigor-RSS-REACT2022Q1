import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppRouter } from '../components/AppRouter';
import { renderWithRouter } from '../test/helper/renderWithRouter';
import '@testing-library/jest-dom';
import { Home } from './Home';

describe('Home', () => {
  it('home location path', () => {
    renderWithRouter(<AppRouter />);
    expect(screen.getByTestId('home-title')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
  });
  it('Render Home page', () => {
    render(<Home />);
    expect(screen.getByTestId('home-title')).toBeInTheDocument();
  });
});
