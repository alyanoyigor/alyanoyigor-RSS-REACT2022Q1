import React from 'react';
import { screen } from '@testing-library/react';
import { AppRouter } from '../components/AppRouter';
import { renderWithRouter } from '../test/helper/renderWithRouter';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('home location path', () => {
    renderWithRouter(<AppRouter />);
    expect(screen.getByTestId('home-title')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
  });
});
