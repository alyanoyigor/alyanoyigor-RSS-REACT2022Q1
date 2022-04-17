import React from 'react';
import styled from 'styled-components';
import { GenreData } from '../../types/types';

const Genres = styled.div`
  display: flex;
  gap: 0.32px;
  flex-wrap: wrap;
  margin: 8px 0;
`;

const GenreWrapper = styled.span`
  border: 2px solid transparent;
  border-image: linear-gradient(to right, #2596be, #66b6d2, #fff);
  border-image-slice: 1;
  padding: 0.32px;
  text-transform: uppercase;
  border-radius: 10px;
  font-size: 10px;
  color: #134b5f;
`;

const Genre = ({ children }: { children: React.ReactNode }) => {
  return <GenreWrapper data-testid="card-genre">{children}</GenreWrapper>;
};

type MovieGenresProps = {
  genres: GenreData[];
};

export const MovieGenres = ({ genres }: MovieGenresProps) => {
  return (
    <Genres>
      {genres.map((genre) => (
        <Genre key={genre.id}>{genre.name}</Genre>
      ))}
    </Genres>
  );
};
