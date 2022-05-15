import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardsList } from '../components/MovieCards/CardsList';
import { SearchField } from '../components/SearchField';
import { SortBtnData, State } from '../types/types';
import { MoviesPaginate } from '../components/MoviesPaginate';
import {
  getMoviesData,
  findMovieBySearchFieldValue,
  getMovieGenres,
  sortMovies,
} from '../requests/requests';
import { sortBtnsData } from '../data/sortBtns';
import { SortMovies } from '../components/SortMovies';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { Preloader } from '../components/Preloader';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomeToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 16px;
  margin-bottom: 16px;
`;

type MoviesState = {
  dataSource: 'SORT' | 'SEARCH' | 'DEFAULT';
  searchValue?: string;
  isDesc?: boolean;
  sortParam?: string;
};

const moviesState: MoviesState = {
  dataSource: 'DEFAULT',
};

export const Home = () => {
  const [moviesData, setMoviesData] = useState<MoviesState>(moviesState);
  const [pageNum, setPageNum] = useState(0);
  const [sortBtns, setSortBtns] = useState(sortBtnsData);

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: { appState: State }) => state.appState);

  const createMoviesData = async (searchValue: string | null) => {
    try {
      setPageNum(0);
      if (searchValue) {
        dispatch(findMovieBySearchFieldValue({ value: searchValue, pageNum: 1 }));
        setMoviesData({
          dataSource: 'SEARCH',
          searchValue,
        });
      } else {
        dispatch(getMoviesData(1));
        setMoviesData({ dataSource: 'DEFAULT' });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const savedSearchValue = localStorage.getItem('searchValue');
    createMoviesData(savedSearchValue);
    dispatch(getMovieGenres());
    return () => {};
  }, [dispatch]);

  const handleSortClick = async (sortBtn: SortBtnData) => {
    try {
      const { isDesc, parameter } = sortBtn;
      setPageNum(0);
      dispatch(sortMovies({ page: 1, param: parameter, isDesc }));
      setMoviesData({
        dataSource: 'SORT',
        isDesc,
        sortParam: parameter,
      });
      setSortBtns((prevState) => {
        const copyState = prevState.map((state) => ({
          ...state,
          isDesc: true,
        }));
        let curBtn = prevState.find((prevBtn) => prevBtn.parameter === parameter);
        const curBtnIndex = prevState.findIndex((prevBtn) => prevBtn.parameter === parameter);
        if (curBtn) {
          curBtn = { ...curBtn, isDesc: !curBtn.isDesc };
          copyState[curBtnIndex] = curBtn;
        }
        return copyState;
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handlePaginate = async (data: { selected: number }) => {
    const pageNumber = data.selected + 1;
    setPageNum(data.selected);
    try {
      switch (moviesData.dataSource) {
        case 'DEFAULT':
          dispatch(getMoviesData(pageNumber));
          setMoviesData({ dataSource: 'DEFAULT' });
          break;
        case 'SEARCH':
          if (moviesData.searchValue) {
            dispatch(
              findMovieBySearchFieldValue({ value: moviesData.searchValue, pageNum: pageNumber })
            );
            setMoviesData((prevState) => ({
              dataSource: 'SEARCH',
              searchValue: prevState.searchValue,
            }));
          }
          break;
        case 'SORT':
          if (moviesData.sortParam && moviesData.isDesc !== undefined) {
            dispatch(
              sortMovies({
                page: pageNumber,
                param: moviesData.sortParam,
                isDesc: moviesData.isDesc,
              })
            );
            setMoviesData((prevState) => ({
              dataSource: 'SORT',
              isDesc: prevState.isDesc,
              sortParam: prevState.sortParam,
            }));
          }
          break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HomeWrapper>
      <HomeToolbar>
        <h1 data-testid="home-title">Home</h1>
        <SortMovies sortBtns={sortBtns} handleSortClick={handleSortClick} />
        <SearchField onSubmitMovie={createMoviesData} />
      </HomeToolbar>
      <MoviesPaginate pageNum={pageNum} handlePaginate={handlePaginate} />
      <CardsList />
    </HomeWrapper>
  );
};
