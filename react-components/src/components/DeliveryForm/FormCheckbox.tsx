import React from 'react';
import styled from 'styled-components';

type FormCheckboxProps = {
  labelValue: string;
  required: boolean;
};

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

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  & span:after {
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

  & input:checked ~ span:after {
    display: block;
  }

  & input:checked ~ span {
    background-color: rgb(31, 109, 131);
  }
`;

export const FormCheckbox = ({ labelValue, required }: FormCheckboxProps) => {
  return (
    <CheckboxLabel>
      {labelValue}
      <CheckboxInput type="checkbox" required={required} />
      <Checkmark />
    </CheckboxLabel>
  );
};
