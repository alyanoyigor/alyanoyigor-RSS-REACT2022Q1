import React from 'react';
import { InputFormProps } from '../../types/types';
import { StyledInput } from '../StyledInput';
import { InputContainer } from './InputContainer';

export const Input = (props: InputFormProps) => {
  const {
    maxWidth,
    labelText,
    errorTestId,
    errorMessage,
    isValid,
    inputRef,
    inputType,
    inputPlaceholder,
    inputTestId,
  } = props;
  return (
    <InputContainer
      maxWidth={maxWidth}
      labelText={labelText}
      errorTestId={errorTestId}
      errorMessage={errorMessage}
      isValid={isValid}
    >
      <StyledInput
        type={inputType}
        data-testid={inputTestId}
        ref={inputRef}
        placeholder={inputPlaceholder}
      />
    </InputContainer>
  );
};
