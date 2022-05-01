import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardsList } from '../components/MovieCards/CardsList';
import { SearchField } from '../components/SearchField';
import { GenreData, MovieData, SortBtnData } from '../types/types';
import { MoviesPaginate } from '../components/MoviesPaginate';
import {
  findMovieBySearchFieldValue,
  getMovieData,
  getMovieGenres,
  sortMovies,
} from '../requests/requests';
import { sortBtnsData } from '../data/sortBtns';
import { SortMovies } from '../components/SortMovies';

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
  movies: MovieData[];
  totalCount: number;
  dataSource: 'SORT' | 'SEARCH' | 'DEFAULT';
  searchValue?: string;
  isDesc?: boolean;
  sortParam?: string;
};

const moviesState: MoviesState = {
  movies: [],
  totalCount: 0,
  dataSource: 'DEFAULT',
};

export const Home = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [moviesData, setMoviesData] = useState<MoviesState>(moviesState);
  const [genresData, setGenresData] = useState<GenreData[]>([]);
  const [pageNum, setPageNum] = useState(0);
  const [sortBtns, setSortBtns] = useState(sortBtnsData);

  const createMoviesData = async (searchValue: string | null) => {
    try {
      setIsFetching(true);
      let data;
      setPageNum(0);
      if (searchValue) {
        data = await findMovieBySearchFieldValue(searchValue, 1);
        setMoviesData({
          movies: data.results,
          totalCount: data.total_pages,
          dataSource: 'SEARCH',
          searchValue,
        });
      } else {
        data = await getMovieData(1);
        setMoviesData({
          movies: data.results,
          totalCount: data.total_pages,
          dataSource: 'DEFAULT',
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const savedSearchValue = localStorage.getItem('searchValue');
    createMoviesData(savedSearchValue);
    getMovieGenres().then((genresData) => setGenresData(genresData));
    return () => {};
  }, []);

  const handleSortClick = async (sortBtn: SortBtnData) => {
    try {
      const { isDesc, parameter } = sortBtn;
      setIsFetching(true);
      setPageNum(0);
      const data = await sortMovies(1, parameter, isDesc);
      setMoviesData({
        movies: data.results,
        totalCount: data.total_pages,
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
    } finally {
      setIsFetching(false);
    }
  };

  const handlePaginate = async (data: { selected: number }) => {
    const pageNumber = data.selected + 1;
    setPageNum(data.selected);
    setIsFetching(true);
    try {
      switch (moviesData.dataSource) {
        case 'DEFAULT':
          const data = await getMovieData(pageNumber);
          setMoviesData({
            movies: data.results,
            totalCount: data.total_pages,
            dataSource: 'DEFAULT',
          });
          break;
        case 'SEARCH':
          if (moviesData.searchValue) {
            const data = await findMovieBySearchFieldValue(moviesData.searchValue, pageNumber);
            setMoviesData((prevState) => ({
              movies: data.results,
              totalCount: data.total_pages,
              dataSource: 'SEARCH',
              searchValue: prevState.searchValue,
            }));
          }
          break;
        case 'SORT':
          if (moviesData.sortParam && moviesData.isDesc !== undefined) {
            const data = await sortMovies(pageNumber, moviesData.sortParam, moviesData.isDesc);
            setMoviesData((prevState) => ({
              movies: data.results,
              totalCount: data.total_pages,
              dataSource: 'SORT',
              isDesc: prevState.isDesc,
              sortParam: prevState.sortParam,
            }));
          }
          break;
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <HomeWrapper>
      <HomeToolbar>
        <h1 data-testid="home-title">Home</h1>
        <SortMovies sortBtns={sortBtns} handleSortClick={handleSortClick} />
        <SearchField onSubmitMovie={createMoviesData} />
      </HomeToolbar>
      <MoviesPaginate
        totalCount={moviesData.totalCount}
        pageNum={pageNum}
        handlePaginate={handlePaginate}
      />
      <CardsList isFetching={isFetching} genresData={genresData} moviesData={moviesData.movies} />
    </HomeWrapper>
  );
};
