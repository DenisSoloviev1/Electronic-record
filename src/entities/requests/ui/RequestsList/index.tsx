import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Container } from './style';

export const RequestsList = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Typography variant="h3" paragraph sx={{ marginBottom: 8 }}>
        Выберите отдел
      </Typography>
      <ul>{children}</ul>
    </Container>
  );
};
