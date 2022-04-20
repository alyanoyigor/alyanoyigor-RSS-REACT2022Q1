import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardsList } from '../components/MovieCards/CardsList';
import { HomeToolbar } from '../components/HomeToolbar';
import { SearchField } from '../components/SearchField';
import { GenreData, MovieData } from '../types/types';
import axios from 'axios';
import { MOVIE_API_KEY } from '../config';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Home = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [moviesData, setMoviesData] = useState<MovieData[]>([]);
  const [genresData, setGenresData] = useState<GenreData[]>([]);

  const getMovieGenres = async () => {
    try {
      const genresRequest = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}`
      );
      return genresRequest.data.genres;
    } catch (e) {
      console.log(e);
    }
  };

  const findMovieBySearchFieldValue = async (value: string, pageNum: number) => {
    try {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${value}&page=${pageNum}&api_key=${MOVIE_API_KEY}`
      );
      return movies.data.results;
    } catch (e) {
      console.log(e);
    }
  };

  const getMovieData = async (page: number) => {
    try {
      const moviesRequest = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${MOVIE_API_KEY}`
      );
      return moviesRequest.data.results;
    } catch (e) {
      console.log(e);
    }
  };

  const createMoviesData = (searchValue: string | null) => {
    setIsFetching(true);
    if (searchValue) {
      findMovieBySearchFieldValue(searchValue, 1).then((moviesData: MovieData[]) => {
        setMoviesData(moviesData);
        setIsFetching(false);
      });
    } else {
      getMovieData(1).then((moviesData) => {
        setMoviesData(moviesData);
        setIsFetching(false);
      });
    }
  };

  useEffect(() => {
    const savedSearchValue = localStorage.getItem('searchValue');
    createMoviesData(savedSearchValue);
    getMovieGenres().then((genresData) => setGenresData(genresData));

    return () => {};
  }, []);

  return (
    <HomeWrapper>
      <HomeToolbar>
        <h1 data-testid="home-title">Home</h1>
        <SearchField onSubmitMovie={createMoviesData} />
      </HomeToolbar>
      <CardsList isFetching={isFetching} genresData={genresData} moviesData={moviesData} />
    </HomeWrapper>
  );
};
