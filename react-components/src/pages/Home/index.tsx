import React from 'react';
import styled from 'styled-components';
import { CardsList } from '../../components/MovieCards/CardsList';
import { HomeToolbar } from '../../components/HomeToolbar';
import { SearchField } from '../../components/SearchField';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Home = () => {
  return (
    <HomeWrapper>
      <HomeToolbar>
        <h1 data-testid="home-title">Home</h1>
        <SearchField />
      </HomeToolbar>
      <CardsList />
    </HomeWrapper>
  );
};
