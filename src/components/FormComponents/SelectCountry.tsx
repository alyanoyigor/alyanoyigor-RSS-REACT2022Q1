import React, { ChangeEvent } from 'react';
import { COUNTRIES_DATA } from '../../data/countriesData';
import { BasicInputProps } from '../../types/types';
import { ErrorMessage } from './ErrorMessage';
import { InputTitle } from './InputTitle';
import { StyledSelect } from './StyledSelect';

type SelectCountryProps = BasicInputProps & {
  onSelectCountryChange: (value: number) => void;
};

export const SelectCountry = ({
  register,
  errors,
  inputName,
  onSelectCountryChange,
}: SelectCountryProps) => {
  const handleCountrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelectCountryChange(COUNTRIES_DATA.findIndex((item) => item === e.target.value));
  };
  return (
    <div>
      <InputTitle>Country</InputTitle>
      <StyledSelect
        data-testid="selectCountry"
        isInvalid={Boolean(errors[inputName])}
        {...register(inputName, {
          onChange: handleCountrySelect,
        })}
      >
        <option value="">Select Country</option>
        {COUNTRIES_DATA.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </StyledSelect>
      <ErrorMessage dataTestId="countryError" error={errors[inputName]} />
    </div>
  );
};
