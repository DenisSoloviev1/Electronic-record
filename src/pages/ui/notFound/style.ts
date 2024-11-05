import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100vw;
  max-width: 1320px;
  min-height: 100vh;
  padding: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 30px;

  h2 {
    font-size: 35px;
    font-weight: 400;
    line-height: 30px;
  }
  span {
    font-size: 30px;
  }
  p {
    font-size: 20px;
  }

  svg {
    max-height: 60vh;
    width: 100%;
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

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      max-width: 100%;
      height: 50vh;
    }
  }
  @media (max-width: 350px) {
    // svg {
    //       display: none;

    // }
  }

  @media screen and (min-width: 1321px) {
    margin: 0 auto 20px;
    padding: 20px 40px;
  }
`;
