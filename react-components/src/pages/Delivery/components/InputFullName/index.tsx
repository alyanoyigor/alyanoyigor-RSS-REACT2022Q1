import React from 'react';
import { InputFormProps } from '../../../../interfaces';
import { StyledInput } from '../../../../components/StyledInput';
import { InputControl } from '../InputControl';

export const InputFullName = ({ errorMessage, isValid, refInput }: InputFormProps) => {
  return (
    <InputControl
      maxWidth={20}
      labelValue="Full Name"
      testErrorId="fullNameError"
      errorMessage={errorMessage}
      isValid={isValid}
    >
      <StyledInput
        type="text"
        data-testid="inputFullName"
        placeholder="John Johnson"
        ref={refInput}
      />
    </InputControl>
  );
};
