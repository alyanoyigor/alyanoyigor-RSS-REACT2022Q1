import React from 'react';
import styled from 'styled-components';
import { Search } from '../components/Search';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Home = () => {
  return (
    <HomeWrapper>
      <h1>Home</h1>
      <Search />
    </HomeWrapper>
  );
};
