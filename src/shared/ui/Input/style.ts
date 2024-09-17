import { styled, TextField } from '@mui/material';

export const InputField = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #f1f4f9;
    position: relative;
  }

  & .MuiInputBase-root {
    border-radius: 0.75rem;
  }

  input {
    height: 20px;
  }
`;
