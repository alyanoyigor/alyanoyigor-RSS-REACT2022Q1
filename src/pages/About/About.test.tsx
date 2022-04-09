import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppRouter } from '../../components/AppRouter';
import { renderWithRouter } from '../../test/helper/renderWithRouter';
import '@testing-library/jest-dom';
import { About } from '.';

describe('About', () => {
  it('about location path', () => {
    renderWithRouter(<AppRouter />, '/about-us');
    expect(screen.getByTestId('about-title')).toBeInTheDocument();
  });
  it('Render About page', () => {
    render(<About />);
    expect(screen.queryByTestId('home-title')).not.toBeInTheDocument();
    expect(screen.getByTestId('about-title')).toBeInTheDocument();
  });
});
