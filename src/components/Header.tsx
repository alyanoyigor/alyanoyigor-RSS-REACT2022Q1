import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Container } from './Container';
import { State } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';

const CustomNavLink = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  color: #000;
  &.active {
    font-weight: 700;
  }
`;

const HeaderWrapper = styled.header`
  padding: 16px 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const Header = () => {
  const detailedCard = useSelector((state: { appState: State }) => state.appState.detailedCard);
  const dispatch = useDispatch();

  return (
    <HeaderWrapper data-testid="header">
      <Container>
        <Nav>
          <CustomNavLink data-testid="home-link" to="/">
            Home
          </CustomNavLink>
          <CustomNavLink data-testid="about-link" to="/about">
            About
          </CustomNavLink>
          <CustomNavLink to="/create-movie">Create movie</CustomNavLink>
          {detailedCard && (
            <CustomNavLink to={'/movie/' + detailedCard.id}>{detailedCard.title}</CustomNavLink>
          )}
        </Nav>
      </Container>
    </HeaderWrapper>
  );
};
