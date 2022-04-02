import React from 'react';
import styled from 'styled-components';

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  margin-right: 1.5rem;
`;

export const GenderInput = () => {
  return (
    <div>
      <Label>Gender</Label>
      <RadioLabel>
        Male
        <input type="radio" name="gender" value="male" />
      </RadioLabel>
      <RadioLabel>
        Female
        <input type="radio" name="gender" value="female" />
      </RadioLabel>
    </div>
  );
};
