import React from 'react';
import styled from 'styled-components';
import { CardsList } from '../components/CardsList';
import { HomeToolbar } from '../components/HomeToolbar';
import { Search } from '../components/Search';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Home = () => {
  return (
    <HomeWrapper>
      <HomeToolbar>
        <h1>Home</h1>
        <Search />
      </HomeToolbar>
      <CardsList />
    </HomeWrapper>
  );
};
