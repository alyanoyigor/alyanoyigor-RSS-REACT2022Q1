import React from 'react';
import { CITIES_DATA } from '../../data/citiesData';
import { BasicInputProps } from '../../types/types';
import { ErrorMessage } from './ErrorMessage';
import { InputTitle } from './InputTitle';
import { StyledSelect } from './StyledSelect';

type SelectCityProps = BasicInputProps & {
  countryId: number | null;
};

export const SelectCity = ({ register, errors, inputName, countryId }: SelectCityProps) => {
  let cities = null;
  if (countryId !== null && countryId !== -1) {
    cities = CITIES_DATA[countryId].split('|');
  }
  return (
    <div>
      <InputTitle>City</InputTitle>
      <StyledSelect
        isInvalid={Boolean(errors[inputName])}
        data-testid="selectCity"
        {...register(inputName)}
      >
        <option value="">Select City</option>
        {cities?.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </StyledSelect>
      <ErrorMessage dataTestId="cityError" error={errors[inputName]} />
    </div>
  );
};
