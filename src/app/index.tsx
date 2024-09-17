import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import styled from 'styled-components';
import { Routing } from '@/pages';
import 'dayjs/locale/ru';
import { DateProvider, QueryProvider, RouterProvider } from './providers';

const Progress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function App() {
  return (
    <DateProvider>
      <QueryProvider>
        <RouterProvider>
          <Suspense fallback={<Progress />}>
            <Routing />
          </Suspense>
        </RouterProvider>
      </QueryProvider>
    </DateProvider>
  );
}

export default App;
