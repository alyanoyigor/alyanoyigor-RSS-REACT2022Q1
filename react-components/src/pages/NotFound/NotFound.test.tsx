import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppRouter } from '../../components/AppRouter';
import { renderWithRouter } from '../../test/helper/renderWithRouter';
import '@testing-library/jest-dom';
import { NotFound } from '.';

describe('NotFound', () => {
  it('location path when page not found', () => {
    renderWithRouter(<AppRouter />, '/asdfadsf');
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  it('Render 404 page', () => {
    render(<NotFound />);
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
