import styled from 'styled-components';

export const RequestListItem = styled.li`
  font-size: 1rem;
  line-height: 1.5rem;
  display: block;

  margin-bottom: 1em;
  padding: 0.75em;
  width: 100%;
  max-width: 480px;

  border: 1px solid #38424f;
  border-radius: 13px;
  list-style-type: none;

  cursor: pointer;

  transition: all ease 0.4s;

  &:hover {
    border: 1px solid #fff;
    background: #11519c;
    color: #fff;
  }
`;
