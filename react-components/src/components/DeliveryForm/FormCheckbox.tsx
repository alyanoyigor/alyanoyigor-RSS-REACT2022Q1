import React, { RefObject } from 'react';
import styled from 'styled-components';

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 4px;
  background-color: #eee;
  border: ${(props: { isValid: boolean }) => (props.isValid ? 'none' : '1px solid #e91b1b')};

  &:after {
    content: '';
    position: absolute;
    display: none;
  }
`;

const CheckboxLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;

  & .checkmark:after {
    left: 9px;
    top: 5px;
    width: 4px;
    height: 9px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  & input:checked ~ .checkmark:after {
    display: block;
  }

  & input:checked ~ .checkmark {
    background-color: rgb(31, 109, 131);
  }

  & .error-message {
    display: block;
    font-size: 0.8rem;
    color: #e91b1b;
  }
`;

type FormCheckboxProps = {
  labelValue: string;
  isValid: boolean;
  errorMessage?: string;
  testId?: string;
  checkboxPrivacy?: RefObject<HTMLInputElement>;
};

export const FormCheckbox = ({
  labelValue,
  checkboxPrivacy,
  isValid,
  errorMessage,
  testId,
}: FormCheckboxProps) => {
  return (
    <CheckboxLabel>
      {labelValue}
      <CheckboxInput type="checkbox" data-testid={testId} ref={checkboxPrivacy} />
      <Checkmark className="checkmark" isValid={isValid} />
      <span className="error-message">{errorMessage}</span>
    </CheckboxLabel>
  );
};
