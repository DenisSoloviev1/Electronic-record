import { NavLink as BaseNavLink } from "react-router-dom";
import styled from "styled-components";

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
width: 40vw;
  padding: 3.4em 3.4em 5em;

  @media (max-width: 900px) {
  width: 100vw;
    padding: 2em;
  }
`;

export const NavLink = styled(BaseNavLink)`
  display: inline-block;
  margin-top: 1em;
  width: 100%;
  max-width: 480px;
  border-radius: 0.75rem;
  border: 1px solid #38424f;
  background: #fff;
  padding: 1em 2.5em;

  color: #38424f;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.01125rem;
  transition: all ease 0.5s;

  &:hover {
    border: 1px solid #fff;
    background: #11519c;
    color: #fff;
  }

  &.active {
    background: #11519c;
    color: #fff;
  }

  @media (max-width: 550px) {
    font-size: 0.8rem;
  }
`;

export const TextMessage = styled.p`
  color: #38424f;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.0125rem;
  margin-top: 1rem;

  @media (max-width: 550px) {
    font-size: 1.125rem;
  }
`;
