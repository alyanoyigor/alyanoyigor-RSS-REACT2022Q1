import React from 'react';
import styled from 'styled-components';
import { CardsList } from '../../components/MovieCards/CardsList';
import { HomeToolbar } from '../../components/HomeToolbar';
import { SearchField } from '../../components/SearchField';
import { GenreData, MovieData } from '../../interfaces';
import axios from 'axios';
import { MOVIE_API_KEY } from '../../config';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export class Home extends React.Component<
  Record<string, unknown>,
  { moviesData: MovieData[]; genresData: GenreData[]; isFetching: boolean }
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { moviesData: [], genresData: [], isFetching: false };
  }

  componentDidMount() {
    const savedSearchValue = localStorage.getItem('searchValue');
    this.createMoviesData(savedSearchValue);
    this.getMovieGenres().then((genresData) =>
      this.setState((prevState) => ({ ...prevState, genresData }))
    );
  }

  async getMovieGenres() {
    try {
      const genresRequest = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}`
      );
      return genresRequest.data.genres;
    } catch (e) {
      console.log(e);
    }
  }

  async findMovieBySearchFieldValue(value: string, pageNum: number) {
    try {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${value}&page=${pageNum}&api_key=${MOVIE_API_KEY}`
      );
      return movies.data.results;
    } catch (e) {
      console.log(e);
    }
  }

  async getMovieData(page: number) {
    try {
      const moviesRequest = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${MOVIE_API_KEY}`
      );
      return moviesRequest.data.results;
    } catch (e) {
      console.log(e);
    }
  }

  createMoviesData(searchValue: string | null) {
    this.setState((prevState) => ({ ...prevState, isFetching: true }));
    if (searchValue) {
      this.findMovieBySearchFieldValue(searchValue, 1).then((moviesData: MovieData[]) => {
        this.setState((prevState) => ({ ...prevState, moviesData }));
        this.setState((prevState) => ({ ...prevState, isFetching: false }));
      });
    } else {
      this.getMovieData(1).then((moviesData) => {
        this.setState((prevState) => ({ ...prevState, moviesData }));
        this.setState((prevState) => ({ ...prevState, isFetching: false }));
      });
    }
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  render() {
    return (
      <HomeWrapper>
        <HomeToolbar>
          <h1 data-testid="home-title">Home</h1>
          <SearchField onSubmitMovie={this.createMoviesData.bind(this)} />
        </HomeToolbar>
        <CardsList
          isFetching={this.state.isFetching}
          genresData={this.state.genresData}
          moviesData={this.state.moviesData}
        />
      </HomeWrapper>
    );
  }
}
