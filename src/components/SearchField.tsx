import React, { useEffect, useState } from 'react';
import { SearchInput } from './StyledInput';

type SearchFieldProps = {
  onSubmitMovie: (value: string) => void;
};

export const SearchField = ({ onSubmitMovie }: SearchFieldProps) => {
  const [searchValue, setSearchValue] = useState('');

  const saveValueToLocalStorage = (value: string) => {
    localStorage.setItem('searchValue', value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () => saveValueToLocalStorage(searchValue));
    return () => {
      window.removeEventListener('beforeunload', () => saveValueToLocalStorage(searchValue));
    };
  }, [searchValue]);

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
