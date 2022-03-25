import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Container } from './Container';

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: rebeccapurple;
  &.active {
    font-weight: 700;
  }
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <Container>
        <Nav>
          <CustomNavLink to="/">Home</CustomNavLink>
          <CustomNavLink to="/about-us">About</CustomNavLink>
        </Nav>
      </Container>
    </HeaderWrapper>
  );
};
