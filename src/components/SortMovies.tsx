import React from 'react';
import styled from 'styled-components';
import { SortBtnData } from '../types/types';

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SortBtn = styled.button`
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  border: 3px solid transparent;
  border-image: linear-gradient(to right, #2596be, #66b6d2, #fff);
  padding: 8px;
  border-image-slice: 1;
  background-color: transparent;
  margin: 0;
`;

const SortTitle = styled.p`
  font-weight: 500;
  margin: 0 16px 0 0;
`;

type SortMoviesProps = {
  sortBtns: SortBtnData[];
  handleSortClick: (value: SortBtnData) => void;
};

export const SortMovies = ({ sortBtns, handleSortClick }: SortMoviesProps) => {
  return (
    <SortWrapper>
      <SortTitle>SORT BY</SortTitle>
      {sortBtns.map((sortBtn) => (
        <SortBtn key={sortBtn.parameter} onClick={() => handleSortClick(sortBtn)}>
          {sortBtn.name} <span>{sortBtn.isDesc ? '↑' : '↓'}</span>
        </SortBtn>
      ))}
    </SortWrapper>
  );
};
