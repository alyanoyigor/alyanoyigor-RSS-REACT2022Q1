import React from 'react';
import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

const Error = styled.span`
  font-size: 12px;
  color: #d40e00;
`;

export const ErrorMessage = ({
  error,
  dataTestId,
}: {
  error?: FieldError;
  dataTestId?: string;
}) => {
  if (!error) {
    return null;
  }
  return <Error data-testid={dataTestId}>{error.message}</Error>;
};
