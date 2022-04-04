import React from 'react';
import styled from 'styled-components';

type InputControlProps = {
  labelValue?: string;
  errorMessage?: string;
  testErrorId?: string;
  children?: React.ReactNode;
} & InputWrapperProps;

type InputWrapperProps = {
  maxWidth?: number;
  isValid?: boolean;
};

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: ${(props: InputWrapperProps) => props.maxWidth}rem;

  & input,
  & select {
    color: #fff;
    border-color: ${(props: InputWrapperProps) => props.isValid === false && '#ff8585'};
  }

  & option {
    background-color: rgb(31, 109, 131);
  }

  & input::placeholder,
  & select::placeholder {
    color: #ccc;
  }

  & .label {
    color: #fff;
    font-weight: 500;
    display: block;
  }

  & .error-message {
    display: block;
    font-size: 0.8rem;
    color: #ff8585;
  }

  @media screen and (max-width: 768px) {
    max-width: none;
  }
`;

export const InputControl = ({
  labelValue,
  maxWidth = 15,
  errorMessage,
  isValid,
  testErrorId,
  children,
}: InputControlProps) => {
  return (
    <InputWrapper maxWidth={maxWidth} isValid={isValid}>
      <label className="label">{labelValue}</label>
      {children}
      <span data-testid={testErrorId} className="error-message">
        {errorMessage}
      </span>
    </InputWrapper>
  );
};
