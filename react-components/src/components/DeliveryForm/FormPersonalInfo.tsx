import React from 'react';
import { StyledInput } from '../StyledInput';
import { FormBlock } from './FormBlock';
import { InputControl } from './InputControl';

export class FormPersonalInfo extends React.Component {
  calculateAge(birthday: Date) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  render() {
    return (
      <FormBlock title="Personal Info">
        <InputControl maxWidth={20} labelValue="Full Name">
          <StyledInput type="text" placeholder="John Johnson" name="nameInput" />
        </InputControl>
        <InputControl maxWidth={12} labelValue="Birthday date">
          <StyledInput type="date" />
        </InputControl>
        <InputControl maxWidth={12} labelValue="Profile picture">
          <StyledInput type="file" />
        </InputControl>
      </FormBlock>
    );
  }
}
