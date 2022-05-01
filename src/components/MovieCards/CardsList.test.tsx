import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../test/helper/renderWithRouter';
import { GenreData, MovieData } from '../../types/types';
import { CardsList } from './CardsList';

describe('Cards List', () => {
  let testMovieData: MovieData[];
  let testGenresData: GenreData[];
  beforeAll(() => {
    testMovieData = [
      {
        adult: false,
        backdrop_path: '/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg',
        genre_ids: [16, 10751, 35, 14],
        id: 508947,
        original_language: 'en',
        original_title: 'Turning Red',
        overview:
          'Thirteen-year-old Mei is experiencing the awkwardness of being a teenager with a twist – when she gets too excited, she transforms into a giant red panda.',
        popularity: 9926.676,
        poster_path: '/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg',
        release_date: '2022-03-01',
        title: 'Turning Red',
        video: false,
        vote_average: 7.5,
        vote_count: 1122,
      },
      {
        adult: false,
        backdrop_path: '/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
        genre_ids: [28, 12, 878],
        id: 634649,
        original_language: 'en',
        original_title: 'Spider-Man: No Way Home',
        overview:
          'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
        popularity: 8542.716,
        poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
        release_date: '2021-12-15',
        title: 'Spider-Man: No Way Home',
        video: false,
        vote_average: 8.2,
        vote_count: 10567,
      },
      {
        adult: false,
        backdrop_path: '/ewUqXnwiRLhgmGhuksOdLgh49Ch.jpg',
        genre_ids: [28, 12, 35, 878, 18],
        id: 696806,
        original_language: 'en',
        original_title: 'The Adam Project',
        overview:
          'After accidentally crash-landing in 2022, time-traveling fighter pilot Adam Reed teams up with his 12-year-old self on a mission to save the future.',
        popularity: 4751.084,
        poster_path: '/wFjboE0aFZNbVOF05fzrka9Fqyx.jpg',
        release_date: '2022-03-11',
        title: 'The Adam Project',
        video: false,
        vote_average: 7,
        vote_count: 1270,
      },
    ];
    testGenresData = [
      {
        id: 28,
        name: 'Action',
      },
      {
        id: 12,
        name: 'Adventure',
      },
      {
        id: 16,
        name: 'Animation',
      },
      {
        id: 35,
        name: 'Comedy',
      },
    ];
  });

  it('Render cards', async () => {
    renderWithRouter(
      <CardsList genresData={testGenresData} isFetching={false} moviesData={testMovieData} />
    );
    const cards = screen.getAllByTestId('card-item');
    expect(cards.length).toBe(3);
  });

  it('Cards have titles', async () => {
    renderWithRouter(
      <CardsList genresData={testGenresData} isFetching={false} moviesData={testMovieData} />
    );
    expect(screen.getByText(/Turning Red/i)).toBeInTheDocument();
    expect(screen.getByText(/Spider-Man/i)).toBeInTheDocument();
    expect(screen.getByText(/The Adam/i)).toBeInTheDocument();
  });

  it('Card have correct genres', async () => {
    testMovieData = [
      {
        adult: false,
        backdrop_path: '/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg',
        genre_ids: [16, 10751, 35, 14],
        id: 508947,
        original_language: 'en',
        original_title: 'Turning Red',
        overview:
          'Thirteen-year-old Mei is experiencing the awkwardness of being a teenager with a twist – when she gets too excited, she transforms into a giant red panda.',
        popularity: 9926.676,
        poster_path: '/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg',
        release_date: '2022-03-01',
        title: 'Turning Red',
        video: false,
        vote_average: 7.5,
        vote_count: 1122,
      },
    ];

    renderWithRouter(
      <CardsList genresData={testGenresData} isFetching={false} moviesData={testMovieData} />
    );
    expect(screen.getByText(/Animation/i)).toBeInTheDocument();
    expect(screen.getByText(/Comedy/i)).toBeInTheDocument();
    expect(screen.queryByText(/Action/i)).not.toBeInTheDocument();
  });
});
