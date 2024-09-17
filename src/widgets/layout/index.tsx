import { Stack } from '@mui/material';
import { ReactNode, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Aside, Box, Btn } from '@/widgets/layout/style';
import { mainTitle, Routes } from '@/shared/constants';
import { isMobile } from '@/shared/lib';
import { Cross, Flex } from '@/shared/ui';

import { NavBar } from '../navbar';

export const Layout = memo(({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const handelClick = () => navigate(Routes.MAIN);
  const isMain = window.location.pathname === Routes.MAIN;

  return (
    <Stack direction="row" justifyContent="space-between">
      {isMobile ? (
        <>
          {isMain && (
            <Aside>
              <NavBar />
            </Aside>
          )}
          {!isMain && (
            <Box $bg="#fff">
              <Flex
                $justify="space-between"
                $align="center"
                style={{ marginBottom: '2em' }}
              >
                <h4>{mainTitle[window.location.pathname]}</h4>

                <Btn onClick={handelClick}>
                  <Cross />
                </Btn>
              </Flex>
              {children}
            </Box>
          )}
        </>
      ) : (
        <>
          <Aside>
            <NavBar />
          </Aside>

          <Box $bg={isMain ? 'transparent' : '#fff'}>{children}</Box>
        </>
      )}
    </Stack>
  );
});
