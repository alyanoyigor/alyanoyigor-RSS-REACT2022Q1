import axios from 'axios';
import React, { ChangeEvent } from 'react';
import { MOVIE_API_KEY } from '../config';
import { MovieData } from '../interfaces';
import { SearchInput } from './StyledInput';

type SearchFieldProps = {
  onChangeMoviesList: (movies: MovieData[]) => void;
};

export class SearchField extends React.Component<SearchFieldProps, { searchValue: string }> {
  constructor(props: SearchFieldProps) {
    super(props);
    this.state = { searchValue: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const savedSearchValue = localStorage.getItem('searchValue');
    if (savedSearchValue) {
      this.setState({
        searchValue: savedSearchValue,
      });
    }
    this.createMoviesData(savedSearchValue);
  }

  componentWillUnmount() {
    this.saveValueToLocalStorage(this.state.searchValue);
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

  saveValueToLocalStorage(value: string) {
    localStorage.setItem('searchValue', value);
  }

  createMoviesData(searchValue: string | null) {
    if (searchValue) {
      this.findMovieBySearchFieldValue(searchValue, 1).then((data: MovieData[]) => {
        this.props.onChangeMoviesList(data);
      });
    } else {
      this.getMovieData(1).then((data) => this.props.onChangeMoviesList(data));
    }
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value;
    this.setState({ searchValue });
    this.saveValueToLocalStorage(searchValue);
    this.createMoviesData(searchValue);
  }

  render() {
    return (
      <SearchInput
        type="text"
        placeholder="Search..."
        value={this.state.searchValue}
        onChange={this.handleChange}
        role="search"
      />
    );
  }
}
