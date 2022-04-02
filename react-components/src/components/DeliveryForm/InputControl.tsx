import React from 'react';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: ${(props: { maxWidth: number }) => props.maxWidth}rem;

  & input {
    color: #fff;
  }

  & input::placeholder,
  & select::placeholder {
    color: #ccc;
  }

  & label {
    color: #fff;
    font-weight: 500;
    display: block;
  }

  @media screen and (max-width: 768px) {
    max-width: none;
  }
`;

type InputControlProps = {
  labelValue?: string;
  maxWidth?: number;
  children?: React.ReactNode;
};

export const InputControl = ({ labelValue, maxWidth = 15, children }: InputControlProps) => {
  return (
    <InputWrapper maxWidth={maxWidth}>
      <label>{labelValue}</label>
      {children}
    </InputWrapper>
  );
};
