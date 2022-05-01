import React from 'react';
import { Card } from './Card';
import { GenreData, MovieData } from '../../types/types';
import { Preloader } from '../Preloader';
import { ListWrapper } from './ListWrapper';
import { useNavigate } from 'react-router-dom';

type CardsListProps = {
  moviesData: MovieData[];
  genresData: GenreData[];
  isFetching: boolean;
};

export const CardsList = ({ moviesData, genresData, isFetching }: CardsListProps) => {
  const navigate = useNavigate();
  const filterGenresFromMovie = (movieGenreIds: number[]) => {
    return genresData.filter((genre) => movieGenreIds.find((id) => id === genre.id));
  };

  if (isFetching) {
    return <Preloader />;
  }
  return (
    <>
      <ListWrapper data-testid="card-list">
        {!moviesData.length ? (
          <h2>Nothing was found</h2>
        ) : (
          moviesData.map((movie: MovieData) => (
            <Card
              className="movie-card"
              handleClick={() => navigate(`/movie/${movie.id}`)}
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
