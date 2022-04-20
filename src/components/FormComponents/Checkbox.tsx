import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { CheckboxState } from '../../types/types';

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
  height: 24px;
  width: 24px;
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
  padding-left: 32px;
  margin-bottom: 12px;
  cursor: pointer;
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
    font-size: 12px;
    color: #e91b1b;
  }
`;

type FormCheckboxProps = {
  labelValue: string;
  checkboxState: CheckboxState;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  testId?: string;
};

export const Checkbox = ({
  labelValue,
  testId,
  checkboxState,
  handleChange,
}: FormCheckboxProps) => {
  return (
    <CheckboxLabel>
      {labelValue}
      <CheckboxInput
        type="checkbox"
        data-testid={testId}
        checked={checkboxState.isChecked}
        onChange={handleChange}
      />
      <Checkmark className="checkmark" isValid={!Boolean(checkboxState.error)} />
      <span className="error-message">{checkboxState.error}</span>
    </CheckboxLabel>
  );
};
