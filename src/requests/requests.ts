import { MOVIE_API_KEY } from './../config';
import axios from 'axios';

export const getDetailMovieData = async (id: string) => {
  try {
    const movies = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API_KEY}`
    );
    return movies.data;
  } catch (e) {
    console.log(e);
  }
};

export const sortMovies = async (page: number, param: string, isDesc: boolean) => {
  try {
    const sortOrder = isDesc ? 'desc' : 'asc';
    const moviesRequest = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?sort_by=${param}.${sortOrder}&api_key=${MOVIE_API_KEY}&page=${page}`
    );
    return moviesRequest.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMovieGenres = async () => {
  try {
    const genresRequest = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}`
    );
    return genresRequest.data.genres;
  } catch (e) {
    console.log(e);
  }
};

export const findMovieBySearchFieldValue = async (value: string, pageNum: number) => {
  try {
    const movies = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${value}&page=${pageNum}&api_key=${MOVIE_API_KEY}`
    );
    return movies.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMovieData = async (page: number) => {
  try {
    const moviesRequest = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${MOVIE_API_KEY}`
    );
    return moviesRequest.data;
  } catch (e) {
    console.log(e);
  }
};
