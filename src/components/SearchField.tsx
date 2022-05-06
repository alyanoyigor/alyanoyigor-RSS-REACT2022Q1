import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchValueAction } from '../store/appSlice';
import { State } from '../types/types';
import { SearchInput } from './StyledInput';

type SearchFieldProps = {
  onSubmitMovie: (value: string) => void;
};

export const SearchField = ({ onSubmitMovie }: SearchFieldProps) => {
  const searchValueFromState = useSelector(
    (state: { appState: State }) => state.appState.searchValue
  );
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const saveValueToLocalStorage = (value: string) => {
    localStorage.setItem('searchValue', value);
  };

  const updateSearchValue = (value: string) => dispatch(addSearchValueAction(value));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    updateSearchValue(event.target.value);
    saveValueToLocalStorage(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (event.target instanceof HTMLInputElement) {
        onSubmitMovie(event.target.value);
      }
    }
  };

  useEffect(() => {
    const savedSearchValue = localStorage.getItem('searchValue');
    if (savedSearchValue) {
      setSearchValue(savedSearchValue);
      updateSearchValue(savedSearchValue);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () => saveValueToLocalStorage(searchValueFromState));
    return () => {
      window.removeEventListener('beforeunload', () =>
        saveValueToLocalStorage(searchValueFromState)
      );
    };
  }, [searchValueFromState]);

  return (
    <SearchInput
      type="text"
      placeholder="Search..."
      value={searchValue}
      onChange={handleChange}
      onKeyDown={handleEnterPress}
      role="search"
    />
  );
};
