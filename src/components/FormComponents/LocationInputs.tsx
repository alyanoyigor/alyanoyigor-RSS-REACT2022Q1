import React, { useState } from 'react';
import { InputState, UpdateFormState } from '../../types/types';
import { FormBlock } from './FormBlock';
import { Input } from './Input';
import { InputContainer } from './InputContainer';
import { SelectCity } from './SelectCity';
import { SelectCountry } from './SelectCountry';

type LocationInputsProps = {
  zipCodeInputState: InputState;
  countrySelectState: InputState;
  citySelectState: InputState;
  updateFormState: (state: UpdateFormState) => void;
};

export const LocationInputs = (props: LocationInputsProps) => {
  const { zipCodeInputState, countrySelectState, citySelectState, updateFormState } = props;

  const [countryId, setCountryId] = useState<number | null>(null);

  const changeCountry = (countryId: number) => {
    setCountryId(countryId);
  };

  return (
    <FormBlock title="Location Info">
      <InputContainer
        errorMessage={countrySelectState.error}
        errorTestId="countryError"
        labelText="Country"
      >
        <SelectCountry
          handleSelectChange={updateFormState}
          onSelectCountryChange={changeCountry}
          countrySelectValue={countrySelectState.value}
        />
      </InputContainer>
      <InputContainer errorMessage={citySelectState.error} errorTestId="cityError" labelText="City">
        <SelectCity
          handleSelectChange={updateFormState}
          countryId={countryId}
          citySelectValue={citySelectState.value}
        />
      </InputContainer>
      <Input
        handleInputChange={(e) =>
          updateFormState({ type: 'SET_ZIPCODE_INPUT', value: e.target.value })
        }
        inputState={zipCodeInputState}
        errorTestId="zipCodeError"
        labelText="Zip code"
        inputTestId="zipCodeInput"
        inputType="number"
        inputPlaceholder="#####"
      />
    </FormBlock>
  );
};
