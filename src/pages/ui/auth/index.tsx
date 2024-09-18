import { Box, Stack, ThemeProvider, createTheme } from '@mui/material';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { AuthModel } from '@/entities/auth';
import { Routes } from '@/shared/constants';
import { isMobile } from '@/shared/lib';
import { Roles } from '@/shared/types';
import { Badge } from '@/shared/ui';
import { Container, ContainerFluid, H1, H4, Image } from './style';

const Auth = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 300, // phone
        sm: 600, // tablets
        md: 900, // small laptop
        lg: 1200, // desktop
        xl: 1536, // large screens
      },
    },
  });

  // const { data } = useQuery({
  //   queryKey: [QueryReqName.authByDSTU, { code: 'dsfdsfsd' }],
  //   queryFn: authByDSTU,
  //   refetchOnWindowFocus: false,
  // });

  // const firstRender = useRef(true);
  //
  // useEffect(() => {
  //   if (firstRender.current) {
  //     window.location.href = `https://stud.sssu.ru/WebApp/#/Authorize?client_id=724363&redirect_uri=http://localhost:5173/`;
  //   }
  //
  //   firstRender.current = false;
  //   return () => {
  //     firstRender.current = true;
  //   };
  // }, []);

  const { login } = AuthModel.useAuthStore();
  const navigate = useNavigate();

  const handleClick = (role: Roles) => {
    login(role);
    navigate(Routes.MAIN);
  };

  return (
    <ContainerFluid>
      <Container>
        <Stack
          width="100%"
          gap="17em"
          alignItems="flex-start"
          direction="row"
          justifyContent="center"
          sx={{
            marginTop: {
              md: '4.3em',
              sm: 0,
            },
          }}
        >
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                width: {
                  sm: '100%',
                  md: '60%',
                },
                padding: {
                  sm: '0 3em',
                  xs: '1em 3em',
                  md: 0,
                },
              }}
            >
              <H1>Заказ справок и принятие обращений ДГТУ</H1>
              <H4>Кто вы?</H4>
              <Badge
                onClick={() => handleClick('Работник')}
                label="сотрудник"
                icon={
                  <IconChevronRight
                    color="#fff"
                    width={isMobile ? 33 : 66}
                    height={isMobile ? 33 : 66}
                  />
                }
                direction="rtl"
              />
              <Badge
                // disabled={true}
                onClick={() => handleClick('Студент')}
                label="студент"
                icon={
                  <IconChevronRight
                    color="#fff"
                    width={isMobile ? 33 : 66}
                    height={isMobile ? 33 : 66}
                  />
                }
                direction="rtl"
              />
              <Badge
                // disabled={true}
                onClick={() => handleClick('Соискатель')}
                label="соискатель"
                icon={
                  <IconChevronRight
                    color="#fff"
                    width={isMobile ? 33 : 66}
                    height={isMobile ? 33 : 66}
                  />
                }
                direction="rtl"
              />
            </Box>
          </ThemeProvider>
          <Image src="/logo2.png" alt="logo" />
        </Stack>
      </Container>
    </ContainerFluid>
  );
};

export default Auth;
