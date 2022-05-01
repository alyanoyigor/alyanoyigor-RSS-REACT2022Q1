import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../store/context';
import { SearchInput } from './StyledInput';

type SearchFieldProps = {
  onSubmitMovie: (value: string) => void;
};

export const SearchField = ({ onSubmitMovie }: SearchFieldProps) => {
  const ctx = useContext(AppContext);
  const [searchValue, setSearchValue] = useState('');

  const saveValueToLocalStorage = (value: string) => {
    localStorage.setItem('searchValue', value);
  };

  const updateSearchValue = (value: string) =>
    ctx.dispatchAppState({ type: 'ADD_SEARCH_VALUE', payload: value });

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
    window.addEventListener('load', () => {
      const savedSearchValue = localStorage.getItem('searchValue');
      if (savedSearchValue) {
        setSearchValue(savedSearchValue);
        updateSearchValue(savedSearchValue);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () =>
      saveValueToLocalStorage(ctx.appState.searchValue)
    );
    return () => {
      window.removeEventListener('beforeunload', () =>
        saveValueToLocalStorage(ctx.appState.searchValue)
      );
    };
  }, [ctx.appState.searchValue]);

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
