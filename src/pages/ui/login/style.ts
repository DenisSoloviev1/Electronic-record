import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const Container = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:10px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 5px 0;
  width: 100%;
  max-width: 300px;
  border-radius: 0.75rem;
  border: 1px solid #38424f;
  background: #fff;
  padding: .5em 1.5em;

  color: #38424f;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.01125rem;
  transition: all ease 0.5s;

  svg {
      transition: all ease 0.5s;
      height: 50px;
      width: 50px;
    }

  &:hover {
    border: 1px solid #fff;
    background: #11519c;
    color: #fff;
    cursor: pointer;

    svg {
      fill: #fff;
    }
  }

  &.active {
    background: #11519c;
    color: #fff;
  }

  @media (max-width: 550px) {
    font-size: 0.8rem;
  }
`;

export const Text = styled.p`
  color: #38424f;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.01125rem;

  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;
