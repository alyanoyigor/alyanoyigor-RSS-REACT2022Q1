import React from 'react';
import { Container } from './Container';
import styled from 'styled-components';

const Wrapper = styled.main`
  width: 100%;
  padding: 1rem 0;
`;

export const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};
