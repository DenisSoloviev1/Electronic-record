import { NavLink as BaseNavLink } from 'react-router-dom';
import styled from 'styled-components';

export const PlainText = styled.p`
  color: #38424f;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: -0.01125rem;

  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;

export const NavBarContainer = styled.div`
  padding: 3.4em 3.4em 5em;

  @media (max-width: 550px) {
    padding: 1em;
  }
`;

export const NavLink = styled(BaseNavLink)`
  display: inline-block;
  margin-top: 1.4em;
  width: 100%;
  border-radius: 0.75rem;
  background: #fff;
  padding: 1em 2.5em;

  color: #38424f;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.01125rem;

  &.active {
    background: #11519c;
    color: #fff;
  }

  @media (max-width: 550px) {
    font-size: 0.8rem;
  }
`;
