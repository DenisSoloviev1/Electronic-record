import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100vw;
  max-width: 1320px;
  padding: 20px 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 30px;

  h1 {
    font-size: 30px;
    font-weight: 400;
  }

  p {
    font-size: 20px;
  }

  svg {
    max-width: 40%;
  }
  a {
    text-decoration: none;
    font-weight: 400;
    color: #166ff6;
    transition: all 0.3s ease-in;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (min-width: 1321px) {
    margin: 0 auto 20px;
    padding: 20px 40px;
  }
`;
