import React from 'react';
import styled from 'styled-components';
import { GenreData } from '../../types/types';
import { convertDate } from '../../utils/utils';
import { CardButtons } from './CardButtons';
import { MovieGenres } from './MovieGenres';

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const CarDate = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`;

const CardTextWrapper = styled.div`
  padding: 16px;
`;

type CardTextSectionProps = {
  title: string;
  genres: GenreData[];
  popularity: number;
  release_date: string | null;
};

export const CardTextSection = ({
  title,
  genres,
  popularity,
  release_date,
}: CardTextSectionProps) => {
  let date = 'unknown';
  if (release_date) {
    const convertedDate = convertDate(release_date, { month: 'long' });
    date = `${convertedDate.month.slice(0, 3)} ${convertedDate.day}, ${convertedDate.year}`;
  }

  return (
    <CardTextWrapper>
      <CardTitle data-testid="card-title">{title}</CardTitle>
      <CarDate data-testid="card-date">{date}</CarDate>
      <MovieGenres genres={genres} />
      <CardButtons popularity={popularity} />
    </CardTextWrapper>
  );
};
