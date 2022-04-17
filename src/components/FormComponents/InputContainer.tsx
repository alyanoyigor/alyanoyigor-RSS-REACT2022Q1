import React from 'react';
import styled from 'styled-components';

type InputControlProps = {
  labelText?: string;
  errorMessage?: string;
  errorTestId?: string;
  children?: React.ReactNode;
} & InputWrapperProps;

type InputWrapperProps = {
  isValid: boolean;
  maxWidth?: number;
};

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 8px;
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
    font-size: 12px;
    color: #ff8585;
  }

  @media screen and (max-width: 768px) {
    max-width: none;
  }
`;

export const InputContainer = ({
  labelText,
  maxWidth,
  errorMessage,
  isValid,
  errorTestId,
  children,
}: InputControlProps) => {
  return (
    <InputWrapper maxWidth={maxWidth} isValid={isValid}>
      <label className="label">{labelText}</label>
      {children}
      <span data-testid={errorTestId} className="error-message">
        {errorMessage}
      </span>
    </InputWrapper>
  );
};

InputContainer.defaultProps = {
  maxWidth: 15,
};
