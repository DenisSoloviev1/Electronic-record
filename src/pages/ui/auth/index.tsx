import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { AuthModel } from "@/entities/auth";
import { Routes } from "@/shared/constants";
import { isMobile } from "@/shared/lib";
import { RolesDict } from "@/shared/types";
import { Badge } from "@/shared/ui";
import { Container, ContainerFluid, H1, H4, Image } from "./style";

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

  const { setRole, resetAuth } = AuthModel.useAuthStore();
  const navigate = useNavigate();

  const handleClick = (roleLabel: string) => {
    resetAuth();
    const roleKey = (
      Object.keys(RolesDict) as Array<keyof typeof RolesDict>
    ).find((key) => RolesDict[key] === roleLabel);

    if (roleKey) {
      if (roleLabel === "Соискатель") {
        setRole(RolesDict[roleKey]);
        navigate(Routes.MAIN);
      } else {
        navigate(Routes.LOGIN);
      }
    } else {
      console.error("Неизвестная роль:", roleLabel);
    }
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
              md: "4.3em",
              sm: 0,
            },
          }}
        >
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                width: {
                  sm: "100%",
                  md: "60%",
                },
                padding: {
                  sm: "0 3em",
                  xs: "1em 3em",
                  md: 0,
                },
              }}
            >
              <H1>Заказ справок и принятие обращений ДГТУ</H1>
              <H4>Кто вы?</H4>
              <Badge
                onClick={() => handleClick("Работник")}
                label="работник"
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
                onClick={() => handleClick("Студент")}
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
                onClick={() => handleClick("Соискатель")}
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
