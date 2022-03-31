import styled, { css } from 'styled-components';

const inputStyles = css`
  font-size: 16px;
  font-weight: 400;
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid #000;
  width: 100%;
  max-width: 15rem;
`;

export const StyledInput = styled.input`
  ${inputStyles}
`;

export const StyledSelect = styled.select`
  ${inputStyles}
`;
