import React, { ChangeEvent } from 'react';
import { COUNTRIES_DATA } from '../../data/countriesData';
import { StyledSelect } from '../StyledInput';

type SelectCountryProps = {
  onSelectCountryChange: (value: number) => void;
};

export const SelectCountry = (props: SelectCountryProps) => {
  const handleCountrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    props.onSelectCountryChange(COUNTRIES_DATA.findIndex((item) => item === e.target.value));
  };
  return (
    <StyledSelect name="Country" onChange={handleCountrySelect} required>
      <option value="">Select Country</option>
      {COUNTRIES_DATA.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </StyledSelect>
  );
};
