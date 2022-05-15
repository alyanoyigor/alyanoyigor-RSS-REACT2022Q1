import { MOVIE_API_KEY } from './../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMoviesData = createAsyncThunk(
  'movies/getMovies',
  async (page: number, { rejectWithValue }) => {
    try {
      const moviesResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${MOVIE_API_KEY}`
      );

      if (!moviesResponse.status.toString().startsWith('2')) {
        throw new Error('Server Error!');
      }

      return { movies: moviesResponse.data.results, totalCount: moviesResponse.data.total_pages };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getMovieGenres = createAsyncThunk(
  'movies/getMovieGenres',
  async (_, { rejectWithValue }) => {
    try {
      const genresRequest = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}`
      );
      return genresRequest.data.genres;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const findMovieBySearchFieldValue = createAsyncThunk(
  'movies/findMovieBySearchFieldValue',
  async ({ value, pageNum }: { value: string; pageNum: number }, { rejectWithValue }) => {
    try {
      const moviesResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${value}&page=${pageNum}&api_key=${MOVIE_API_KEY}`
      );
      return { movies: moviesResponse.data.results, totalCount: moviesResponse.data.total_pages };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const sortMovies = createAsyncThunk(
  'movies/sortMovies',
  async (
    { page, param, isDesc }: { page: number; param: string; isDesc: boolean },
    { rejectWithValue }
  ) => {
    try {
      const sortOrder = isDesc ? 'desc' : 'asc';
      const moviesResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?sort_by=${param}.${sortOrder}&api_key=${MOVIE_API_KEY}&page=${page}`
      );
      return { movies: moviesResponse.data.results, totalCount: moviesResponse.data.total_pages };
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export const getDetailMovieData = createAsyncThunk(
  'movie/getDetailMovieData',
  async (id: string, { rejectWithValue }) => {
    try {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API_KEY}`
      );
      return movies.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
