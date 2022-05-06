import { ChangeEvent } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
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

export type CreateMovieInputs = {
  title: string;
  poster: FileList;
  releaseDate: string;
  audience: string;
  budget: number;
  country: string;
  city: string;
  privacyCheckbox: boolean;
};

export type FormCardData = {
  title: string;
  poster: FileList;
  releaseDate: string;
  audience: string;
  budget: number;
  country: string;
  city: string;
  privacyCheckbox: boolean;
};

export type InputsError = {
  title?: FieldError;
  poster?: FieldError;
  releaseDate?: FieldError;
  audience?: FieldError;
  budget?: FieldError;
  country?: FieldError;
  city?: FieldError;
  privacyCheckbox?: FieldError;
};

export type BasicInputProps = {
  register: UseFormRegister<CreateMovieInputs>;
  errors: InputsError;
  inputName: keyof InputsError;
};

export type DisplayedCardData = {
  id: number;
  title: string;
};

export type State = {
  formCards: FormCardData[];
  searchValue: string;
  displayedCard?: DisplayedCardData;
};

export type AppContextData = {
  appState: State;
  dispatchAppState: (value: Action) => void;
};

export type Action =
  | { type: 'ADD_FORM_CARD'; payload: FormCardData }
  | { type: 'ADD_SEARCH_VALUE'; payload: string }
  | { type: 'ADD_DISPLAYED_CARD'; payload?: DisplayedCardData };

export type SortBtnData = {
  name: string;
  isDesc: boolean;
  parameter: string;
};
