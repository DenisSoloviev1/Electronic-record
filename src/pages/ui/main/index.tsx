import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const AssentP = styled.p`
  margin: 2rem 0;
`;

export const Link = styled.a`
  width: fit-content;
  color: #007bff;
  text-decoration: none;

  &:hover, &:active {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Main = () => {
  return <Image src="/main.png" alt="main" />;
};

export default Main;
