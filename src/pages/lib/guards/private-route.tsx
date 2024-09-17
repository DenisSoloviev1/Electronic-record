import { ComponentType, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import { AuthModel } from '@/entities/auth';
import { Roles } from '@/shared/types';

interface IPrivateRoute {
  element: ComponentType;
  isPublic: boolean;
  roles: Roles[];
  withLayout: boolean;
}

export const PrivateRoute: FC<IPrivateRoute> = ({
  element: RouteComponent,
  isPublic,
  withLayout,
  roles,
}) => {
  const { isAuth, role } = AuthModel.useAuthStore((state) => state);

  if (isPublic) return <RouteComponent />;

  if (!isAuth && !role && !roles.includes(role)) {
    return <Navigate to="/" replace={true} />;
  }

  if (withLayout) {
    return (
      <Layout>
        <RouteComponent />
      </Layout>
    );
  }

  return <RouteComponent />;
};
