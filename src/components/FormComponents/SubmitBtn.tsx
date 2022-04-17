import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: rgb(9, 77, 95);
  color: #fff;
  border: none;
  border-radius: 8px;
  height: 54px;
  max-width: 160px;
  width: 100%;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:disabled {
    background: rgb(75, 99, 105);
  }

  @media screen and (max-width: 768px) {
    max-width: none;
  }
`;

export const SubmitBtn = ({
  isDisabled,
  children,
}: {
  isDisabled: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Button disabled={isDisabled} type="submit">
      {children}
    </Button>
  );
};
