import React from 'react';
import styled from 'styled-components';
import { GenreData } from '../interfaces';
import { CardTextSection } from './CardTextSection';
import { PosterImage } from './PosterImage';

const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 16rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: 5px 5px 10px 5px rgba(15, 60, 76, 0.15);
  box-shadow: 5px 5px 10px 5px rgba(15, 60, 76, 0.15);

  @media screen and (max-width: 880px) {
    max-width: 12rem;
  }

  @media screen and (max-width: 471px) {
    max-width: 100%;
  }
`;

export type CardProps = {
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  genres: GenreData[];
};

export const Card = ({
  poster_path,
  title,
  vote_average,
  popularity,
  genres,
  release_date,
}: CardProps) => {
  return (
    <CardWrapper data-testid="card-item">
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
