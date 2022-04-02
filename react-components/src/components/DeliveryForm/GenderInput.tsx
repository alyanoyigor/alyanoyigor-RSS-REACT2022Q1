import React from 'react';
import styled from 'styled-components';

const RadioLabel = styled.label`
  display: block;
  position: relative;
  margin-top: 0.4rem;
  padding-left: 2rem;
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
  height: 1.3rem;
  width: 1.3rem;
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

export const GenderInput = () => {
  return (
    <GenderWrapper>
      <GenderTitle>Gender</GenderTitle>
      <div>
        <RadioLabel className="container">
          Male
          <input type="radio" name="gender" value="male" defaultChecked />
          <Checkmark className="checkmark"></Checkmark>
        </RadioLabel>
        <RadioLabel className="container">
          Female
          <input type="radio" name="gender" value="female" />
          <Checkmark className="checkmark"></Checkmark>
        </RadioLabel>
      </div>
    </GenderWrapper>
  );
};
