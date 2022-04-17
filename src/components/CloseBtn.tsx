import styled from 'styled-components';

export const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  padding: 0;
  width: 40px;
  height: 40px;
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
    width: 3px;
    height: 32px;
    background-color: #ffffff;
    border-radius: 1px;
  }

  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;
