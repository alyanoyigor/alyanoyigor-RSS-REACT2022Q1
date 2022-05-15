import { State, FormCardData, DisplayedCardData, MovieData } from './../types/types';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  findMovieBySearchFieldValue,
  getDetailMovieData,
  getMovieGenres,
  getMoviesData,
  sortMovies,
} from '../requests/requests';

const initialState: State = {
  searchValue: '',
  formCards: [],
  movieCards: [],
  genres: [],
  isLoading: false,
  error: null,
  totalPages: 0,
};

const addFormCard: CaseReducer<State, PayloadAction<FormCardData>> = (state, action) => {
  state.formCards.push(action.payload);
};

const addSearchValue: CaseReducer<State, PayloadAction<string>> = (state, action) => {
  state.searchValue = action.payload;
};

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    addSearchValue,
    addFormCard,
  },
  extraReducers: (builder) => {
    builder.addCase(getMoviesData.pending, (state: State) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(findMovieBySearchFieldValue.pending, (state: State) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sortMovies.pending, (state: State) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getDetailMovieData.pending, (state: State) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getMoviesData.fulfilled,
      (state: State, action: PayloadAction<{ movies: MovieData[]; totalCount: number }>) => {
        state.isLoading = false;
        state.movieCards = action.payload.movies;
        state.totalPages = action.payload.totalCount;
      }
    );
    builder.addCase(getMoviesData.rejected, (state: State, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getMovieGenres.fulfilled, (state: State, action) => {
      state.genres = action.payload;
    });
    builder.addCase(
      findMovieBySearchFieldValue.fulfilled,
      (state: State, action: PayloadAction<{ movies: MovieData[]; totalCount: number }>) => {
        state.isLoading = false;
        state.movieCards = action.payload.movies;
        state.totalPages = action.payload.totalCount;
      }
    );
    builder.addCase(
      sortMovies.fulfilled,
      (state: State, action: PayloadAction<{ movies: MovieData[]; totalCount: number }>) => {
        state.isLoading = false;
        state.movieCards = action.payload.movies;
        state.totalPages = action.payload.totalCount;
      }
    );
    builder.addCase(getDetailMovieData.fulfilled, (state: State, action) => {
      state.isLoading = false;
      state.detailedCard = action.payload;
    });
  },
});

export const { addSearchValue: addSearchValueAction, addFormCard: addFormCardAction } =
  appSlice.actions;

export const appReducer = appSlice.reducer;
