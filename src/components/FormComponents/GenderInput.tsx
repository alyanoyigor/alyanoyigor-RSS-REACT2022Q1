import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const RadioLabel = styled.label`
  display: block;
  position: relative;
  margin-top: 8px;
  padding-left: 32px;
  cursor: pointer;
  user-select: none;
  color: #fff;

  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  & input:checked ~ .checkmark {
    background-color: #2196f3;
  }

  & input:checked ~ .checkmark:after {
    display: block;
  }

  & .checkmark:after {
    top: 6px;
    left: 6px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: white;
  }
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 50%;

  &:after {
    content: '';
    position: absolute;
    display: none;
  }
`;

const GenderTitle = styled.span`
  font-weight: 500;
  color: #fff;
`;

const GenderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

type GenderInputProps = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const GenderInput = ({ handleInputChange }: GenderInputProps) => {
  return (
    <GenderWrapper>
      <GenderTitle>Gender</GenderTitle>
      <div onChange={handleInputChange}>
        <RadioLabel className="container">
          Male
          <input type="radio" value="male" name="gender" data-testid="gender-male" defaultChecked />
          <Checkmark className="checkmark"></Checkmark>
        </RadioLabel>
        <RadioLabel className="container">
          Female
          <input type="radio" value="female" name="gender" />
          <Checkmark className="checkmark"></Checkmark>
        </RadioLabel>
      </div>
    </GenderWrapper>
  );
};
