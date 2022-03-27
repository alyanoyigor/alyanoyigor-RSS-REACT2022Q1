import React from 'react';
import styled from 'styled-components';
import { Card } from '../components/Card';
import { MOVIE_API_KEY } from '../config';
import { GenreData, MovieData } from '../interfaces';

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
`;

export class CardsList extends React.Component<
  Record<string, unknown>,
  { moviesData: MovieData[]; genresData: GenreData[] }
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { moviesData: [], genresData: [] };
  }
  componentDidMount() {
    this.getMovieData(1).then((data) =>
      this.setState((prevState) => ({ ...prevState, moviesData: data.results }))
    );
    this.getMovieGenres().then((data) =>
      this.setState((prevState) => ({ ...prevState, genresData: data.genres }))
    );
  }

  async getMovieData(page: number) {
    const moviesRequest = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${MOVIE_API_KEY}`
    );
    const moviesData = await moviesRequest.json();
    return moviesData;
  }

  async getMovieGenres() {
    const genresRequest = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}`
    );
    const genresData = await genresRequest.json();
    return genresData;
  }

  getGenresFromMovie(movieGenreIds: number[]) {
    return this.state.genresData.filter((genre) => movieGenreIds.find((id) => id === genre.id));
  }

  render() {
    return (
      <ListWrapper data-testid="card-list">
        {this.state.moviesData.map((movie: MovieData) => (
          <Card key={movie.id} genres={this.getGenresFromMovie(movie.genre_ids)} {...movie} />
        ))}
      </ListWrapper>
    );
  }
}
