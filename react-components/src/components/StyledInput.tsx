import styled, { css } from 'styled-components';
import SearchIcon from '../assets/svg/search.svg';

const inputStyles = css`
  font-size: 16px;
  font-weight: 400;
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid rgb(0, 117, 150);
  width: 100%;
  outline: none;
  background-color: rgba(255, 255, 255, 0.2);
  height: 3rem;

  &:focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, 0.5), 0 0 10px rgba(133, 222, 247, 0.3),
      0 0 20px rgba(182, 235, 250, 0.2);
    border: 1px solid rgba(81, 203, 238, 1);
  }
`;

export const SearchInput = styled.input`
  ${inputStyles}
  max-width: 15rem;
  background: url(${SearchIcon}) no-repeat scroll 0.5rem 0.8rem;
  background-size: 1.2rem;
  padding-left: 2.5rem;
`;

export const StyledInput = styled.input`
  ${inputStyles}
`;

export const StyledSelect = styled.select`
  ${inputStyles}
`;
