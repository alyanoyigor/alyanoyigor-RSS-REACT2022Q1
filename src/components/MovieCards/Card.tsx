import React from 'react';
import styled from 'styled-components';
import { GenreData } from '../../types/types';
import { CardTextSection } from './CardTextSection';
import { PosterImage } from '../PosterImage';

const CardWrapper = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 256px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: 5px 5px 10px 5px rgba(15, 60, 76, 0.15);
  box-shadow: 5px 5px 10px 5px rgba(15, 60, 76, 0.15);
  cursor: pointer;

  @media screen and (max-width: 880px) {
    max-width: 192px;
  }

  @media screen and (max-width: 488px) {
    max-width: 100%;
  }
`;

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
      <PosterImage poster_path={poster_path} title={title} vote_average={vote_average} />
      <CardTextSection
        popularity={popularity}
        title={title}
        genres={genres}
        release_date={release_date}
      />
    </CardWrapper>
  );
};
