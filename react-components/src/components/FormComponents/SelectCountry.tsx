import React, { ChangeEvent, RefObject } from 'react';
import { COUNTRIES_DATA } from '../../data/countriesData';
import { StyledSelect } from '../StyledInput';

type SelectCountryProps = {
  countrySelect: RefObject<HTMLSelectElement>;
  onSelectCountryChange: (value: number) => void;
};

export const SelectCountry = ({ onSelectCountryChange, countrySelect }: SelectCountryProps) => {
  const handleCountrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelectCountryChange(COUNTRIES_DATA.findIndex((item) => item === e.target.value));
  };
  return (
    <StyledSelect
      ref={countrySelect}
      data-testid="selectCountry"
      name="Country"
      onChange={handleCountrySelect}
    >
      <option value="">Select Country</option>
      {COUNTRIES_DATA.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </StyledSelect>
  );
};
