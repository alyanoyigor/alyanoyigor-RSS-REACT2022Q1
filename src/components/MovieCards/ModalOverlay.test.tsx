import { fireEvent, render, screen } from '@testing-library/react';
import { DetailedMovieData } from '../../interfaces';
import '@testing-library/jest-dom';
import { ModalOverlay } from './ModalOverlay';
import DefaultImg from '../../assets/oops-404.jpg';
import { MOVIE_POSTER_URL } from '../../urls';

describe('Modal Overlay', () => {
  let testDetailedData: DetailedMovieData;
  let onConfirm: jest.Mock<Record<string, unknown>>;
  beforeAll(() => {
    onConfirm = jest.fn();
  });
  beforeEach(() => {
    testDetailedData = {
      adult: false,
      backdrop_path: '/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg',
      belongs_to_collection: null,
      budget: 190000000,
      genres: [
        { id: 16, name: 'Animation' },
        { id: 10751, name: 'Family' },
        { id: 35, name: 'Comedy' },
        { id: 14, name: 'Fantasy' },
      ],
      homepage: 'https://www.disneyplus.com/movies/turning-red/4mFPCXJi7N2m',
      id: 508947,
      imdb_id: 'tt8097030',
      original_language: 'en',
      original_title: 'Turning Red',
      overview:
        'Thirteen-year-old Mei is experiencing the awkwardness of being a teenager with a twist – when she gets too excited, she transforms into a giant red panda.',
      popularity: 6019.358,
      poster_path: '/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg',
      production_companies: [
        {
          id: 2,
          logo_path: '/wdrCwmRnLFJhEoH8GSfymY85KHT.png',
          name: 'Walt Disney Pictures',
          origin_country: 'US',
        },
        {
          id: 3,
          logo_path: '/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png',
          name: 'Pixar',
          origin_country: 'US',
        },
      ],
      production_countries: [{ iso_3166_1: 'US', name: 'United States of America' }],
      release_date: '2022-03-10',
      revenue: 0,
      runtime: 100,
      spoken_languages: [],
      status: 'Released',
      tagline: 'Growing up is a beast.',
      title: 'Turning Red',
      video: false,
      vote_average: 7.4,
      vote_count: 1563,
    };
  });
  it('date not found => span not render', () => {
    const onConfirm = jest.fn();
    testDetailedData.release_date = null;
    render(<ModalOverlay movieData={testDetailedData} onConfirm={onConfirm} />);
    expect(screen.queryByTestId('modal-card-date')).not.toBeInTheDocument();
  });
  it('date found => span render', () => {
    render(<ModalOverlay movieData={testDetailedData} onConfirm={onConfirm} />);
    expect(screen.getByTestId('modal-card-date')).toBeInTheDocument();
  });
  it('genres found => span render', () => {
    render(<ModalOverlay movieData={testDetailedData} onConfirm={onConfirm} />);
    expect(screen.getByTestId('modal-card-genres')).toBeInTheDocument();
  });
  it('genres not found => span not render', () => {
    testDetailedData.genres = [];
    render(<ModalOverlay movieData={testDetailedData} onConfirm={onConfirm} />);
    expect(screen.queryByTestId('modal-card-genres')).not.toBeInTheDocument();
  });
  it('poster not found => set default path for image', () => {
    testDetailedData.poster_path = null;
    render(<ModalOverlay movieData={testDetailedData} onConfirm={onConfirm} />);
    expect(screen.getByTestId('modal-card-poster')).toHaveAttribute('src', DefaultImg);
  });
  it('poster found => set path for image from request', () => {
    render(<ModalOverlay movieData={testDetailedData} onConfirm={onConfirm} />);
    expect(screen.getByTestId('modal-card-poster')).toHaveAttribute(
      'src',
      MOVIE_POSTER_URL + testDetailedData.poster_path
    );
  });
  it('close modal card', async () => {
    render(<ModalOverlay movieData={testDetailedData} onConfirm={onConfirm} />);
    const closeBtn = screen.getByTestId('modal-card-close-btn');
    fireEvent.click(closeBtn);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
