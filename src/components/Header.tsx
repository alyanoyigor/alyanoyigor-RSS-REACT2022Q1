import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Container } from './Container';

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: #000;
  &.active {
    font-weight: 700;
  }
`;

const HeaderWrapper = styled.header`
  padding: 1rem 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const Header = () => {
  return (
    <HeaderWrapper data-testid="header">
      <Container>
        <Nav>
          <CustomNavLink data-testid="home-link" to="/">
            Home
          </CustomNavLink>
          <CustomNavLink data-testid="about-link" to="/about-us">
            About
          </CustomNavLink>
          <CustomNavLink to="/delivery-form">Delivery</CustomNavLink>
        </Nav>
      </Container>
    </HeaderWrapper>
  );
};
