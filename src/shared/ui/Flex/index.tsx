import styled from "styled-components";

export const Flex = styled.div<{
  $justify?: string;
  $align?: string;
  $direction?: string;
  $gap?: number;
}>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.$direction ?? "row"};
  justify-content: ${(props) => props.$justify ?? "center"};
  align-items: ${(props) => props.$align ?? "center"};
  ${(props) => (props.$gap ? "gap: " + props.$gap + "px" : "")}

  @media (max-width: 900px) {
    flex-direction: ${(props) => props.$direction ?? "column"};
  }
`;
