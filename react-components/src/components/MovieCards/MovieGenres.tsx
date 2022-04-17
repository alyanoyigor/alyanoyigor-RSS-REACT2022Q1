import React from 'react';
import styled from 'styled-components';
import { GenreData } from '../../types/types';

const Genres = styled.div`
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;
  margin: 0.5rem 0;
`;

const GenreWrapper = styled.span`
  border: 2px solid transparent;
  border-image: linear-gradient(to right, #2596be, #66b6d2, #fff);
  border-image-slice: 1;
  padding: 0.2rem;
  text-transform: uppercase;
  border-radius: 10px;
  font-size: 0.6rem;
  color: #134b5f;
`;

const Genre: React.FC<Record<string, unknown>> = ({ children }) => {
  return <GenreWrapper>{children}</GenreWrapper>;
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
