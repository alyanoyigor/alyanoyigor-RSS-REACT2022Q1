import React from 'react';
import { screen } from '@testing-library/react';
import { AppRouter } from '../components/AppRouter';
import { renderWithRouter } from '../test/helper/renderWithRouter';
import '@testing-library/jest-dom';

describe('About', () => {
  it('about location path', () => {
    renderWithRouter(<AppRouter />, '/about-us');
    expect(screen.queryByTestId('home-title')).not.toBeInTheDocument();
    expect(screen.getByTestId('about-title')).toBeInTheDocument();
  });
});
