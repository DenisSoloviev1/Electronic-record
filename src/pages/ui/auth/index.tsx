import { Box, ThemeProvider, createTheme } from "@mui/material";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/entities/auth";
import { Routes } from "@/shared/constants";
import { isMobile } from "@/shared/lib";
import { Roles, RolesDict } from "@/shared/types";
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

  const { setRole, resetAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleClick = (roleLabel: string) => {
    resetAuth();
    const roleValue = Object.entries(RolesDict).find(
      ([, value]) => value === roleLabel
    )?.[1];

    if (roleValue) {
      if (roleLabel === "Соискатель") {
        setRole(roleValue as Roles);
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
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              width: {
                sm: "100%",
                md: "60%",
              },
              padding: {
                xs: "1rem",
                sm: "0 3rem 1rem",
                md: "0",
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
      </Container>
    </ContainerFluid>
  );
};

export default Auth;
