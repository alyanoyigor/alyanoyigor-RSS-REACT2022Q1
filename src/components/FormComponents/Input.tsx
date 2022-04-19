import React from 'react';
import { InputFormProps } from '../../types/types';
import { StyledInput } from '../StyledInput';
import { InputContainer } from './InputContainer';

export const Input = (props: InputFormProps) => {
  const {
    labelText,
    errorTestId,
    inputType,
    inputPlaceholder,
    inputTestId,
    inputState,
    handleInputChange,
  } = props;

  return (
    <InputContainer labelText={labelText} errorTestId={errorTestId} errorMessage={inputState.error}>
      <StyledInput
        onChange={handleInputChange}
        value={inputState.value}
        type={inputType}
        data-testid={inputTestId}
        placeholder={inputPlaceholder}
      />
    </InputContainer>
  );
};
