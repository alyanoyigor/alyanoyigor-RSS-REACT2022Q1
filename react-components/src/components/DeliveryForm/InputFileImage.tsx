import React from 'react';
import { InputFormProps } from '../../interfaces';
import { StyledInput } from '../StyledInput';
import { InputControl } from './InputControl';

export const InputFileImage = ({ errorMessage, isValid, refInput }: InputFormProps) => {
  return (
    <InputControl
      maxWidth={8}
      labelValue="Profile picture"
      testErrorId="fileError"
      errorMessage={errorMessage}
      isValid={isValid}
    >
      <StyledInput type="file" data-testid="inputFile" ref={refInput} />
    </InputControl>
  );
};
