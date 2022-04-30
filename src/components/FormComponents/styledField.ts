import { css } from 'styled-components';

export const styledField = css`
  width: 100%;
  font-size: 14px;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;

  &:focus-visible {
    outline: none;
  }
`;
