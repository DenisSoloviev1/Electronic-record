import React from "react";
import styled, { keyframes } from "styled-components";

interface LoaderProps {
  message?: string;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const pulseAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
`;

const Pulse = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.action};

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: 2px solid ${({ theme }) => theme.colors.action};
    opacity: 0;
    border-radius: 50%;
    animation: ${pulseAnimation} 1.5s linear infinite;
  }

  &::after {
    animation-delay: 0.7s;
  }
`;

const Message = styled.h2`
  font-size: 30px;
`;

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <Container>
      <Pulse />
      <Message>{message}</Message>
    </Container>
  );
};
