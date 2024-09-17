import { Stack } from '@mui/material';
import { IconUser } from '@tabler/icons-react';
import { memo } from 'react';

import { NavBarContainer, NavLink, PlainText } from '@/widgets/navbar/style';

import { AuthModel } from '@/entities/auth';

import { isMobile } from '@/shared/lib';
import { Badge, GoBackBtn } from '@/shared/ui';

import { menuItems } from './constants';

export const NavBar = memo(() => {
  const role = AuthModel.useAuthStore((state) => state.role);

  return (
    <NavBarContainer>
      <Stack spacing={3} mb={6} alignItems="center" direction="row">
        <GoBackBtn />
        <Badge
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
      <PlainText>Выберите подразделение:</PlainText>
      <nav>
        <ul>
          {menuItems.map((link) => (
            <NavLink key={link.id} to={link.path}>
              {link.label}
            </NavLink>
          ))}
        </ul>
      </nav>
    </NavBarContainer>
  );
});
