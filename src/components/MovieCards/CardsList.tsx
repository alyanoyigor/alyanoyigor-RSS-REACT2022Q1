import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { MOVIE_API_KEY } from '../../config';
import { GenreData, MovieData } from '../../interfaces';
import { Preloader } from '../Preloader';

const ListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
`;

type CardsListProps = {
  moviesData: MovieData[];
};

export class CardsList extends React.Component<
  CardsListProps,
  { moviesData: MovieData[]; genresData: GenreData[] }
> {
  constructor(props: CardsListProps) {
    super(props);
    this.state = { moviesData: [], genresData: [] };
  }

  componentDidMount() {
    this.getMovieGenres().then((data) =>
      this.setState((prevState) => ({ ...prevState, genresData: data }))
    );
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

  componentWillUnmount() {
    this.setState = () => {};
  }

  getGenresFromMovie(movieGenreIds: number[]) {
    return this.state.genresData.filter((genre) => movieGenreIds.find((id) => id === genre.id));
  }

  render() {
    return (
      <ListWrapper data-testid="card-list">
        {!this.props.moviesData.length ? (
          <h2>Nothing was found</h2>
        ) : (
          this.props.moviesData.map((movie: MovieData) => (
            <Card key={movie.id} genres={this.getGenresFromMovie(movie.genre_ids)} {...movie} />
          ))
        )}
      </ListWrapper>
    );
  }
}
