import React from 'react';
import { GenreData } from '../../types/types';
import { CardTextSection } from './CardTextSection';
import { PosterImage } from '../PosterImage';
import { CardWrapper } from './CardWrapper';

export type CardProps = {
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string;
  vote_average: number;
  genres: GenreData[];
  className: string;
  handleClick: () => void;
};

export const Card = (props: CardProps) => {
  const {
    className,
    poster_path,
    vote_average,
    popularity,
    title,
    genres,
    release_date,
    handleClick,
  } = props;

  return (
    <CardWrapper className={className} onClick={handleClick} data-testid="card-item">
      <PosterImage posterPath={poster_path} title={title} voteAverage={vote_average} />
      <CardTextSection
        popularity={popularity}
        title={title}
        genres={genres}
        release_date={release_date}
      />
    </CardWrapper>
  );
};
