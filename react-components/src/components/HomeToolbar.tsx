import React from 'react';
import styled from 'styled-components';

const HomeToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

export const HomeToolbar: React.FC<Record<string, unknown>> = ({ children }) => {
  return <HomeToolbarWrapper>{children}</HomeToolbarWrapper>;
};
