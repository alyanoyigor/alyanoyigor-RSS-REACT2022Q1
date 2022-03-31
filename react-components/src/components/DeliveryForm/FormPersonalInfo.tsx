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

export class FormPersonalInfo extends React.Component {
  calculateMinDate() {
    const ADULT_AGE = 18;
    const today = new Date();
    const day = today.getDate();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear() - ADULT_AGE;
    return `${year}-${month}-${day}`;
  }

  render() {
    return (
      <div>
        <h3>Personal information</h3>
        <InputControl labelValue="Name">
          <StyledInput
            type="text"
            placeholder="Name"
            name="nameInput"
            pattern="[A-Za-z]"
            required
          />
        </InputControl>
        <InputControl labelValue="Surname">
          <StyledInput type="text" placeholder="Surname" pattern="[A-Za-z]" required />
        </InputControl>
        <InputControl labelValue="Birthday date">
          <StyledInput type="date" max={this.calculateMinDate()} required />
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
  }
}
