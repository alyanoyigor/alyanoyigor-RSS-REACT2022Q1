import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppRouter } from '../../components/AppRouter';
import { renderWithRouter } from '../../test/helper/renderWithRouter';
import '@testing-library/jest-dom';
import { Home } from './index';
import { mocked } from 'ts-jest/dist/utils/testing';
import axios from 'axios';
import { GenreData, MovieData } from '../../interfaces';

jest.mock('axios');
const mockedAxios = mocked(axios);
const mockedAxiosGet = mocked(mockedAxios.get);

describe('Home', () => {
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
  beforeEach(() => {
    mockedAxiosGet.mockReturnValue(
      Promise.resolve({ data: { results: testMovieData, genres: testGenresData } })
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('home location path', () => {
    renderWithRouter(<AppRouter />);
    expect(screen.getByTestId('home-title')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('Render Home page', () => {
    render(<Home />);
    expect(screen.getByTestId('home-title')).toBeInTheDocument();
  });

  it('search movie', async () => {
    render(<Home />);
    const cardItems = await screen.findAllByTestId('card-item');
    expect(cardItems.length).toBe(3);

    const search = screen.getByRole('search');
    mockedAxiosGet.mockReset();
    mockedAxiosGet.mockReturnValue(
      Promise.resolve({
        data: {
          results: [
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
          ],
          genres: testGenresData,
        },
      })
    );
    fireEvent.change(search, { target: { value: 'Spider-Man: No Way Home' } });
    fireEvent.keyDown(search, { code: 'Enter', key: 'Enter' });

    const updatedCardItems = await screen.findAllByTestId('card-item');
    expect(updatedCardItems.length).toBe(1);
  });
});
