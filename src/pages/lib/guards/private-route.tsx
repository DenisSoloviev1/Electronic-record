import { ComponentType, FC } from "react";
import { Layout } from "@/widgets/layout";
import { useAuthStore } from "@/entities/auth";
import { Roles, RolesDict } from "@/shared/types";
import Login from "@/pages/ui/auth/login";

interface IPrivateRoute {
  element: ComponentType;
  isPublic: boolean;
  roles: Roles[]; // Массив ключей, таких как 'EMPLOYEE', 'STUDENT', 'APPLICANT'
  withLayout: boolean;
}

export const PrivateRoute: FC<IPrivateRoute> = ({
  element: RouteComponent,
  isPublic,
  roles,
}) => {
  const { isAuth, role } = useAuthStore((state) => state);

  // Проверка, является ли страница публичной
  if (isPublic) {
    return <RouteComponent />;
  }

  // Проверка, авторизован ли пользователь
  if (!isAuth) {
    return <Login />;
  }

  // Проверка роли "Соискатель"
  if (role === RolesDict.APPLICANT) {
    return (
      <Layout>
        <RouteComponent />
      </Layout>
    );
  }
    // Если пользователь авторизован, но его роль не соответствует разрешённым ролям, показываем страницу "Not Found"
    if (role && !roles.includes(role as Roles)) {
      return <Login />;//add NotFound page
    }
  
  return (
    <Layout>
      <RouteComponent />
    </Layout>
  );
};
