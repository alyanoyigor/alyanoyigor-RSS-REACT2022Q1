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
  cardId: number;
};

export const Card = (props: CardProps) => {
  const { className, cardId, poster_path, vote_average, popularity, title, genres, release_date } =
    props;

  return (
    <CardWrapper className={className} data-cardid={cardId} data-testid="card-item">
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
