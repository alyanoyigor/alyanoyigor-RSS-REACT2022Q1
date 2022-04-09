import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
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
  genresData: GenreData[];
  isFetching: boolean;
};

export class CardsList extends React.Component<CardsListProps> {
  constructor(props: CardsListProps) {
    super(props);
  }

  filterGenresFromMovie(movieGenreIds: number[]) {
    return this.props.genresData.filter((genre) => movieGenreIds.find((id) => id === genre.id));
  }

  render() {
    if (this.props.isFetching) {
      return <Preloader />;
    }

    return (
      <ListWrapper data-testid="card-list">
        {!this.props.moviesData.length ? (
          <h2>Nothing was found</h2>
        ) : (
          this.props.moviesData.map((movie: MovieData) => (
            <Card key={movie.id} genres={this.filterGenresFromMovie(movie.genre_ids)} {...movie} />
          ))
        )}
      </ListWrapper>
    );
  }
}
