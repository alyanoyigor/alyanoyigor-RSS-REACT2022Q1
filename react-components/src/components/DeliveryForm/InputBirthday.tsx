import React from 'react';
import { InputFormProps } from '../../interfaces';
import { StyledInput } from '../StyledInput';
import { InputControl } from './InputControl';

export const InputBirthday = ({ errorMessage, isValid, refInput }: InputFormProps) => {
  return (
    <InputControl
      maxWidth={10.5}
      labelValue="Birthday date"
      testErrorId="dateError"
      errorMessage={errorMessage}
      isValid={isValid}
    >
      <StyledInput type="date" data-testid="inputDate" ref={refInput} />
    </InputControl>
  );
};
