import { ComponentType, FC } from "react";
import { Layout } from "@/widgets/layout";
import { useAuthStore } from "@/entities/auth";
import { Roles } from "@/shared/types";
import Login from "@/pages/ui/auth/login";
import NotFound from "@/pages/ui/notFound";

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
  // const role: Roles = localStorage.getItem("userRole") as Roles;

  // Проверка, является ли страница публичной
  if (isPublic) {
    return <RouteComponent />;
  }

  // Проверка, авторизован ли пользователь
  if (!isAuth) {
    return <Login />;
  }
  
  // Если пользователь авторизован, но его роль не соответствует разрешённым ролям, показываем страницу "Not Found"
  if (role && !roles.includes(role as Roles)) {
    return <NotFound />;
  }

  return (
    <Layout>
      <RouteComponent />
    </Layout>
  );
};
