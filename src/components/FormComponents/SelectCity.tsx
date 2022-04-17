import React, { RefObject } from 'react';
import { CITIES_DATA } from '../../data/citiesData';
import { StyledSelect } from '../StyledInput';

type SelectCityProps = {
  countryId: number | null;
  citySelect: RefObject<HTMLSelectElement>;
};

export const SelectCity = ({ countryId, citySelect }: SelectCityProps) => {
  let cities = null;
  if (countryId !== null && countryId !== -1) {
    cities = CITIES_DATA[countryId].split('|');
  }
  return (
    <StyledSelect ref={citySelect} data-testid="selectCity" name="City">
      <option value="">Select City</option>
      {cities?.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </StyledSelect>
  );
};
