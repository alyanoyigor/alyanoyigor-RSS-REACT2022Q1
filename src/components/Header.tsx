import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Container } from './Container';
import AppContext from '../store/context';

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
  const ctx = useContext(AppContext);
  const displayedCard = ctx.appState.displayedCard;
  const handleLinkClick = () => {
    if (displayedCard) ctx.dispatchAppState({ type: 'ADD_DISPLAYED_CARD' });
  };
  return (
    <HeaderWrapper data-testid="header">
      <Container>
        <Nav>
          <CustomNavLink data-testid="home-link" to="/" onClick={handleLinkClick}>
            Home
          </CustomNavLink>
          <CustomNavLink data-testid="about-link" to="/about" onClick={handleLinkClick}>
            About
          </CustomNavLink>
          <CustomNavLink to="/create-movie" onClick={handleLinkClick}>
            Create movie
          </CustomNavLink>
          {displayedCard && (
            <CustomNavLink to={'/movie/' + displayedCard.id}>{displayedCard.title}</CustomNavLink>
          )}
        </Nav>
      </Container>
    </HeaderWrapper>
  );
};
