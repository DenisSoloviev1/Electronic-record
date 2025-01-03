import styled from "styled-components";

export const Box = styled.div<{ $bg: string }>`
  border-radius: 3.125rem 0 0 3.125rem;
  background: ${(props) => props.$bg};
  padding: ${(props) => props.$bg !== "transparent" && "2.5em"};
  width: 60%;
  min-height: 100vh;

  @media (max-width: 1000px) {
    width: 100%;
    padding: 1rem 1rem 3rem;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Btn = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`;

export const Aside = styled.aside`
  width: 50%;

  @media (max-width: 550px) {
    width: 100%;
  }
`;
