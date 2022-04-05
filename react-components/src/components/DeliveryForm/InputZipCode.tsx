import React from 'react';
import { InputFormProps } from '../../interfaces';
import { StyledInput } from '../StyledInput';
import { InputControl } from './InputControl';

export const InputZipCode = ({ errorMessage, isValid, refInput }: InputFormProps) => {
  return (
    <InputControl
      errorMessage={errorMessage}
      isValid={isValid}
      testErrorId="zipCodeError"
      maxWidth={20}
      labelValue="Zip code"
    >
      <StyledInput ref={refInput} data-testid="zipCodeInput" type="number" placeholder="#####" />
    </InputControl>
  );
};
