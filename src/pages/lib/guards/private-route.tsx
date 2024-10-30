import { ComponentType, FC } from "react";
import { Layout } from "@/widgets/layout";
import { AuthModel } from "@/entities/auth";
import { Roles } from "@/shared/types";
import Login from "@/pages/ui/login";

interface IPrivateRoute {
  element: ComponentType;
  isPublic: boolean;
  roles: Roles[]; // Массив ключей, таких как 'EMPLOYEE', 'STUDENT', 'APPLICANT'
  withLayout: boolean;
}

export const PrivateRoute: FC<IPrivateRoute> = ({
  element: RouteComponent,
  isPublic,
  withLayout,
  roles,
}) => {
  const { isAuth, role } = AuthModel.useAuthStore((state) => state);

  // Проверка, является ли страница публичной
  if (isPublic) {
    return <RouteComponent />;
  }

  // Проверка, авторизован ли пользователь
  if (!isAuth) {
    return <Login />;
  }

  // Проверка роли "Соискатель"
  if (role === "APPLICANT") {
    return (
      <Layout>
        <RouteComponent />
      </Layout>
    );
  }

  // Проверка разрешенных ролей
  if (roles.includes(role as Roles)) {
    return withLayout ? (
      <Layout>
        <RouteComponent />
      </Layout>
    ) : (
      <RouteComponent />
    );
  }
 

  return (
    <Login />
    // <Layout>
    //   <RouteComponent />
    // </Layout>
  );
};
