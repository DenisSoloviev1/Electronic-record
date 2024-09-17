import styled from "styled-components";

export const Chip = styled.div<{ $primary?: boolean; $disabled?: boolean }>`
  display: inline-flex;

  ${(props) => props.$primary && "gap: 0.5em"};
  ${(props) => !props.$primary && "width: 100%"};
  padding: ${(props) =>
    props.$primary ? "0.5em 2.3em 0.5em 1em" : "1rem 3rem"};
  justify-content: space-between;
  align-items: center;
  border-radius: 1.8rem;
  background-color: ${(props) => (props.$disabled ? "#C4C4C4" : "#11519c")};
  margin-top: ${(props) => !props.$primary && "1em"};

  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};

  &:hover {
   background-color: ${(props) => (props.$disabled ? "#C4C4C4" : "#1b59a0")};
  }

  @media (max-width: 550px) {
    padding: 1em;
  }
`;

export const ChipText = styled.span<{ $primary?: boolean }>`
  color: #f4f4f4;
  font-size: ${(props) => (props.$primary ? "1.6rem" : "2.25rem")};
  font-weight: 500;

  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;
