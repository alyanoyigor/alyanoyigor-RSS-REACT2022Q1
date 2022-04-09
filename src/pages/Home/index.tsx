import React from 'react';
import styled from 'styled-components';
import { CardsList } from '../../components/MovieCards/CardsList';
import { HomeToolbar } from '../../components/HomeToolbar';
import { SearchField } from '../../components/SearchField';
import { MovieData } from '../../interfaces';
import axios from 'axios';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export class Home extends React.Component<Record<string, unknown>, { moviesData: MovieData[] }> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { moviesData: [] };
  }

  setMoviesData(moviesData: MovieData[]) {
    this.setState({ moviesData });
  }

  render() {
    return (
      <HomeWrapper>
        <HomeToolbar>
          <h1 data-testid="home-title">Home</h1>
          <SearchField onChangeMoviesList={this.setMoviesData.bind(this)} />
        </HomeToolbar>
        <CardsList moviesData={this.state.moviesData} />
      </HomeWrapper>
    );
  }
}
