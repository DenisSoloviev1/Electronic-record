import styled from 'styled-components';

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
  margin: 0 auto;
`;

export const H1 = styled.h1`
  color: #38424f;
  font-size: 2.75rem;
  font-weight: 500;
  letter-spacing: -0.0275rem;
  margin-bottom: 1em;

  @media (max-width: 550px) {
    font-size: 1.25rem;
  }
`;

export const H4 = styled.h4`
  color: #38424f;
  font-size: 2rem;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.02rem;
  margin-bottom: 1em;

  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;

export const Image = styled.img`
object-fit: cover;

  @media (max-width: 1000px) {
    display: none;
  }
`;
