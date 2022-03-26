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

export type CardProps = {
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  genres: GenreData[];
};
