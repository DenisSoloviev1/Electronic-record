import { Stack } from "@mui/material";
import { IconUser } from "@tabler/icons-react";
import { memo } from "react";
import {
  NavBarContainer,
  NavLink,
  PlainText,
  TextMessage,
} from "@/widgets/navbar/style";
import { useAuthStore } from "@/entities/auth";
import { isMobile } from "@/shared/lib";
import { Badge, GoBackBtn } from "@/shared/ui";
import { menuItems, Menu } from "./constants";
import { RolesDict } from "@/shared/types";

export const NavBar = memo(() => {
  const role = useAuthStore(
    (state) => state.role
  ) as keyof typeof RolesDict;

  if (!role) {
    return (
      <NavBarContainer>
        <PlainText>Не удалось определить роль пользователя</PlainText>
      </NavBarContainer>
    );
  }

  return (
    <NavBarContainer>
      <Stack spacing={3} mb={3} alignItems="center" direction="row">
        <GoBackBtn />
        <Badge
          not_style={true}
          isAuth={true}
          label={role}
          icon={
            <IconUser
              width={isMobile ? 25 : 45}
              height={isMobile ? 25 : 45}
              color="#fff"
            />
          }
          direction="ltr"
        />
      </Stack>
      <PlainText>Выберите отдел:</PlainText>
      <nav>
        <ul>
          {menuItems
            .filter(
              (link: Menu) =>
                Array.isArray(link.allowedRoles) &&
                link.allowedRoles.includes(role)
            )
            .map((link: Menu) => (
              <NavLink key={link.id} to={link.path}>
                {link.label}
              </NavLink>
            ))}
        </ul>
      </nav>
      <TextMessage>Скоро здесь будут другие ведомства...</TextMessage>
    </NavBarContainer>
  );
});
