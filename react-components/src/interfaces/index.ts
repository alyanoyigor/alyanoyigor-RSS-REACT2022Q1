import { RefObject } from 'react';

export type MovieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type GenreData = {
  id: number;
  name: string;
};

export type InputFormProps = {
  errorMessage: string;
  isValid: boolean;
  refInput: RefObject<HTMLInputElement>;
};

export type DeliveryCard = {
  fullName: string;
  birthday: Date;
  srcImg: string;
  gender: string;
  country: string;
  city: string;
  zipCode: string;
};
