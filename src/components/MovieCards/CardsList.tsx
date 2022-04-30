import React, { useState } from 'react';
import { Card } from './Card';
import { GenreData, MovieData } from '../../types/types';
import { Preloader } from '../Preloader';
import { ModalCard } from './ModalCard';
import { ListWrapper } from './ListWrapper';

type CardsListProps = {
  moviesData: MovieData[];
  genresData: GenreData[];
  isFetching: boolean;
};

export const CardsList = ({ moviesData, genresData, isFetching }: CardsListProps) => {
  const [isOpenCardModal, setIsOpenCardModal] = useState(false);
  const [cardId, setCardId] = useState('');

  const handleOpenModalCard = (e: React.MouseEvent<HTMLUListElement>) => {
    if (e.target instanceof HTMLElement) {
      const movieCard: HTMLElement | null = e.target.closest('.movie-card');
      if (movieCard && movieCard.dataset.cardid) {
        setIsOpenCardModal(true);
        setCardId(movieCard.dataset.cardid);
      }
    }
  };

  const filterGenresFromMovie = (movieGenreIds: number[]) => {
    return genresData.filter((genre) => movieGenreIds.find((id) => id === genre.id));
  };

  if (isFetching) {
    return <Preloader />;
  }
  return (
    <>
      {isOpenCardModal && <ModalCard cardId={cardId} onConfirm={() => setIsOpenCardModal(false)} />}
      <ListWrapper data-testid="card-list" onClick={handleOpenModalCard}>
        {!moviesData.length ? (
          <h2>Nothing was found</h2>
        ) : (
          moviesData.map((movie: MovieData) => (
            <Card
              className="movie-card"
              cardId={movie.id}
              key={movie.id}
              genres={filterGenresFromMovie(movie.genre_ids)}
              {...movie}
            />
          ))
        )}
      </ListWrapper>
    </>
  );
};
