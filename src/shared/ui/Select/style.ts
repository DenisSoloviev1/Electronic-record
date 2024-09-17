import {
  Autocomplete as AutocompleteBase,
  MenuItem,
  Paper as Ppr,
} from '@mui/material';
import styled from 'styled-components';

export const Icon = styled.div`
  position: absolute;
  right: 10px;
  border-radius: 0.5rem;
  border: 1px solid #d2dae3;
  display: flex;
  width: 30px;
  height: 30px;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
`;

export const Autocomplete = styled(AutocompleteBase)`
  background-color: #f1f4f9;
  border-radius: 1rem;

  & .MuiPaper-root {
    box-shadow: none;
    border-radius: 1rem;
    background-color: transparent;
  }

  & .MuiAutocomplete-popupIndicator {
    transform: none;
  }

  & .MuiAutocomplete-inputRoot {
    border-radius: 1rem;
  }
`;

export const Paper = styled(Ppr)`
  & .MuiPaper-root {
    border-radius: 1rem;
    max-height: 300px;
    box-shadow: none;
    border: none;
  }
  background-color: transparent;
`;

export const List = styled.ul`
  margin-top: 15px;
  background-color: #f1f4f9;
  border-radius: 1rem;
  padding: 1rem 0;
  width: 580px;
  max-height: 300px;
`;

export const ListItem = styled(MenuItem)`
  width: 100%;
  white-space: pre-line;
`;
