import styled from "styled-components";

export const ContainerFluid = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 1340px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 35px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13rem;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    gap: 0;
  }
`;
export const ImgContainer = styled.div`
  width: 40%;
  height: 40%;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 350px) {
    display: none;
  }
  @media (max-width: 900px) {
    width: 100%;
    height: 100%;
  }
`;
export const Info = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

   @media (max-width: 900px) {
      gap: 5px;
  }
`;

export const H1 = styled.h1`
  color: #38424f;
  font-size: 2.75rem;
  font-weight: 500;
  letter-spacing: -0.0275rem;
  margin-bottom: 1rem;

  @media (max-width: 550px) {
    font-size: 1.5rem;
  }
`;

export const H4 = styled.h4`
  color: #38424f;
  font-size: 2rem;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.02rem;
  margin-bottom: 0.5rem;

  @media (max-width: 550px) {
    font-size: 1.25rem;
  }
`;

export const Image = styled.img`
  width: 35%;
  object-fit: cover;

  @media (max-width: 350px) {
    display: none;
  }
  @media (max-width: 900px) {
    width: 45%;
  }
`;

// export const Wrapper = styled.div`
//   min-height: 100vh;
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;

//   svg{
//   width: 30%}
// `;

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
  padding: 0.5em 1.5em;

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
