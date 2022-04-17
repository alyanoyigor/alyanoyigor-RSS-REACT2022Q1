import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { MOVIE_API_KEY } from '../../config';
import { GenreData, MovieData } from '../../types/types';
import { Preloader } from '../Preloader';

const ListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
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
      this.setState((prevState) => ({ ...prevState, moviesData: data }))
    );
    this.getMovieGenres().then((data) =>
      this.setState((prevState) => ({ ...prevState, genresData: data }))
    );
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  async getMovieData(page: number) {
    try {
      const moviesRequest = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${MOVIE_API_KEY}`
      );
      return moviesRequest.data.results;
    } catch (e) {
      console.log(e);
    }
  }

  async getMovieGenres() {
    try {
      const genresRequest = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}`
      );
      return genresRequest.data.genres;
    } catch (e) {
      console.log(e);
    }
  }

  getGenresFromMovie(movieGenreIds: number[]) {
    return this.state.genresData.filter((genre) => movieGenreIds.find((id) => id === genre.id));
  }

  render() {
    return (
      <ListWrapper data-testid="card-list">
        {!this.state.moviesData.length ? (
          <Preloader />
        ) : (
          this.state.moviesData.map((movie: MovieData) => (
            <Card key={movie.id} genres={this.getGenresFromMovie(movie.genre_ids)} {...movie} />
          ))
        )}
      </ListWrapper>
    );
  }
}
