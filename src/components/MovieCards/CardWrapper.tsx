import styled from 'styled-components';

export const CardWrapper = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 256px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: 5px 5px 10px 5px rgba(15, 60, 76, 0.15);
  box-shadow: 5px 5px 10px 5px rgba(15, 60, 76, 0.15);
  cursor: pointer;

  @media screen and (max-width: 880px) {
    max-width: 192px;
  }

  @media screen and (max-width: 488px) {
    max-width: 100%;
  }
`;
