import React from 'react';
import { CITIES_DATA } from '../../data/citiesData';
import { UpdateFormState } from '../../types/types';
import { StyledSelect } from '../StyledInput';

type SelectCityProps = {
  countryId: number | null;
  citySelectValue: string | undefined;
  handleSelectChange: (state: UpdateFormState) => void;
};

export const SelectCity = ({ countryId, citySelectValue, handleSelectChange }: SelectCityProps) => {
  let cities = null;
  if (countryId !== null && countryId !== -1) {
    cities = CITIES_DATA[countryId].split('|');
  }
  return (
    <StyledSelect
      value={citySelectValue}
      onChange={(e) => handleSelectChange({ type: 'SET_CITY_SELECT', value: e.target.value })}
      data-testid="selectCity"
      name="City"
    >
      <option value="">Select City</option>
      {cities?.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </StyledSelect>
  );
};
