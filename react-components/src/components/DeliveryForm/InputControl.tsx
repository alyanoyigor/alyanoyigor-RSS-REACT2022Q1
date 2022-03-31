import React from 'react';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: left;

  & label {
    font-weight: 500;
    display: block;
  }
`;

type InputControlProps = {
  labelValue: string;
  children?: React.ReactNode;
};

export const InputControl = ({ labelValue, children }: InputControlProps) => {
  return (
    <InputWrapper>
      <label>
        {labelValue}
        {children}
      </label>
    </InputWrapper>
  );
};
