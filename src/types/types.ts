import { ChangeEvent } from 'react';
export type MovieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type DetailedMovieData = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string | null;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type GenreData = {
  id: number;
  name: string;
};

export type InputState = {
  error: string;
  isValid: boolean;
  value?: string;
};

export type CheckboxState = {
  isChecked: boolean;
  error: string;
  isValid: boolean;
};

export type InputFormProps = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  errorTestId: string;
  inputType: string;
  inputTestId: string;
  inputState: InputState;
  inputPlaceholder?: string;
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

export type UpdateFormState = {
  type:
    | 'SET_GENDER_INPUT'
    | 'SET_FULLNAME_INPUT'
    | 'SET_BIRTHDAY_INPUT'
    | 'SET_FILE_INPUT'
    | 'SET_ZIPCODE_INPUT'
    | 'SET_COUNTRY_SELECT'
    | 'SET_CITY_SELECT'
    | 'SET_CHECKBOX_PRIVACY'
    | 'SET_CHECKBOX_PROMOTION';
  value?: string;
  file?: File;
  isChecked?: boolean;
};
