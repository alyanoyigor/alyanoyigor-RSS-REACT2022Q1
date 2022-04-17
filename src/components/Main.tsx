import React from 'react';
import { Container } from './Container';
import styled from 'styled-components';

const Wrapper = styled.main`
  width: 100%;
  padding: 16px 0;
`;

export const Main: React.FC<Record<string, unknown>> = ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};
