import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { GenreData, MovieData } from '../../types/types';
import { Preloader } from '../Preloader';
import { ModalCard } from './ModalCard';

const ListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  margin: 0;
  padding: 0;
`;

type CardsListProps = {
  moviesData: MovieData[];
  genresData: GenreData[];
  isFetching: boolean;
};

export class CardsList extends React.Component<
  CardsListProps,
  { isOpenCardModal: boolean; cardId: string }
> {
  constructor(props: CardsListProps) {
    super(props);
    this.state = { isOpenCardModal: false, cardId: '' };
    this.handleOpenModalCard = this.handleOpenModalCard.bind(this);
  }

  filterGenresFromMovie(movieGenreIds: number[]) {
    return this.props.genresData.filter((genre) => movieGenreIds.find((id) => id === genre.id));
  }

  handleOpenModalCard(e: React.MouseEvent<HTMLUListElement>) {
    if (e.target instanceof HTMLElement) {
      const movieCard: HTMLElement | null = e.target.closest('.movie-card');
      if (movieCard && movieCard.dataset.cardid) {
        this.setState({ isOpenCardModal: true, cardId: movieCard.dataset.cardid });
      }
    }
  }

  render() {
    if (this.props.isFetching) {
      return <Preloader />;
    }

    return (
      <>
        {this.state.isOpenCardModal && (
          <ModalCard
            cardId={this.state.cardId}
            onConfirm={() => this.setState({ isOpenCardModal: false })}
          />
        )}
        <ListWrapper data-testid="card-list" onClick={this.handleOpenModalCard}>
          {!this.props.moviesData.length ? (
            <h2>Nothing was found</h2>
          ) : (
            this.props.moviesData.map((movie: MovieData) => (
              <Card
                className="movie-card"
                cardId={movie.id}
                key={movie.id}
                genres={this.filterGenresFromMovie(movie.genre_ids)}
                {...movie}
              />
            ))
          )}
        </ListWrapper>
      </>
    );
  }
}
