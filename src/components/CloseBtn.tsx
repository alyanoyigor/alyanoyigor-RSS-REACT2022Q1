import styled from 'styled-components';

export const CloseBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  padding: 0;
  width: 3rem;
  height: 3rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.3;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transition: transform(-50%, -50%);
    width: 0.2rem;
    height: 2.5rem;
    background-color: #ffffff;
    border-radius: 1.5px;
  }

  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;
