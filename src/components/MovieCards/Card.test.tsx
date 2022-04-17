import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MOVIE_POSTER_URL } from '../../urls/urls';
import { Card, CardProps } from './Card';
describe('Card', () => {
  let testCardProps: CardProps;
  beforeAll(() => {
    testCardProps = {
      poster_path: '/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg',
      title: 'Turning Red',
      vote_average: 8.2,
      popularity: 1000,
      genres: [
        { id: 1, name: 'Animation' },
        { id: 2, name: 'Comedy' },
      ],
      release_date: '2021-12-15',
      className: 'movie-card',
      cardId: 1290,
    };
  });
  it('Check elements inside card', () => {
    render(<Card {...testCardProps} />);
    expect(screen.getByTestId('card-img')).toHaveAttribute(
      'src',
      MOVIE_POSTER_URL + '/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg'
    );
    expect(screen.getByTestId('card-rated-text').textContent).toBe('8.2');
    expect(screen.getByTestId('card-title').textContent).toBe('Turning Red');
    expect(screen.getByTestId('card-date').textContent).toBe('Dec 15, 2021');
    expect(screen.getAllByTestId('card-genre').map((span) => span.textContent)).toEqual([
      'Animation',
      'Comedy',
    ]);
  });
});
