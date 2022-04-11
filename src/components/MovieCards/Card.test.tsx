import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
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
    const { container } = render(<Card {...testCardProps} />);
    expect(container).toMatchSnapshot();
  });
});
