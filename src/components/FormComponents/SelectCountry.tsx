import React, { ChangeEvent } from 'react';
import { COUNTRIES_DATA } from '../../data/countriesData';
import { UpdateFormState } from '../../types/types';
import { StyledSelect } from '../StyledInput';

type SelectCountryProps = {
  onSelectCountryChange: (value: number) => void;
  countrySelectValue: string | undefined;
  handleSelectChange: (state: UpdateFormState) => void;
};

export const SelectCountry = ({
  onSelectCountryChange,
  countrySelectValue,
  handleSelectChange,
}: SelectCountryProps) => {
  const handleCountrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelectCountryChange(COUNTRIES_DATA.findIndex((item) => item === e.target.value));
    handleSelectChange({ type: 'SET_COUNTRY_SELECT', value: e.target.value });
  };
  return (
    <StyledSelect
      value={countrySelectValue}
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
