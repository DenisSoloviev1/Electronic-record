import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const AssentP = styled.p`
// margin-top: -2rem;
  // margin-bottom: 2rem;
  margin: 2rem 0;
`;

export const AssentA = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Main = () => {
  return <Image src="/main.png" alt="main" />;
};

export default Main;
