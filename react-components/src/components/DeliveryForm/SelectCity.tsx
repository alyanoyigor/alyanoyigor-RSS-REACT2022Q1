import React from 'react';
import { CITIES_DATA } from '../../data/citiesData';
import { StyledSelect } from '../StyledInput';

type SelectCityProps = {
  countryId: number | null;
};

export const SelectCity = ({ countryId }: SelectCityProps) => {
  let cities = null;
  if (countryId && countryId !== -1) {
    cities = CITIES_DATA[countryId].split('|');
  }
  return (
    <StyledSelect name="City" required>
      <option value="">Select City</option>
      {cities?.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </StyledSelect>
  );
};
