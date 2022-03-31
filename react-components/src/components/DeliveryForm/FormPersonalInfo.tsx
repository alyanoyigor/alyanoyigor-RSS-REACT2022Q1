import React from 'react';
import styled from 'styled-components';
import { StyledInput } from '../StyledInput';
import { InputControl } from './InputControl';

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  margin-right: 1.5rem;
`;

export const FormPersonalInfo = () => {
  return (
    <div>
      <h3>Personal information</h3>
      <InputControl labelValue="Name">
        <StyledInput type="text" placeholder="Name" required />
      </InputControl>
      <InputControl labelValue="Surname">
        <StyledInput type="text" placeholder="Surname" required />
      </InputControl>
      <InputControl labelValue="Birthday date">
        <StyledInput type="date" required />
      </InputControl>
      <div>
        <Label>Gender</Label>
        <RadioLabel>
          Male
          <input type="radio" name="gender" value="male" required />
        </RadioLabel>
        <RadioLabel>
          Female
          <input type="radio" name="gender" value="female" required />
        </RadioLabel>
      </div>
    </div>
  );
};
